const buildTextNode = (content) => {
    let data = '';

    let linkStart = '';

    if (!content || !Array.isArray(content)) return data;

    content.forEach((item, i) => {
        const { text, marks = [] } = item;

        let isBold = marks.find((mark) => mark.type === 'bold');
        let isItalic = marks.find((mark) => mark.type === 'italic');

        let linkHref = marks.filter((mark) => mark.type === 'link')?.[0]?.attrs?.href;

        if (text) {
            let start =
                isBold && isItalic ? '<strong><em>' : isBold ? '<strong>' : isItalic ? '<em>' : '';

            if (!linkStart && linkHref) {
                start = `<a href="${linkHref}">` + start;
                linkStart = linkHref;
            }

            let end =
                isBold && isItalic
                    ? '</em></strong>'
                    : isBold
                    ? '</strong>'
                    : isItalic
                    ? '</em>'
                    : '';

            if (
                linkStart &&
                (i === content.length - 1 ||
                    (content[i + 1]?.marks || []).filter((mark) => mark.type === 'link')?.[0]?.attrs
                        ?.href !== linkStart)
            ) {
                linkStart = '';
                end += '</a>';
            }

            data += start + text + end;
        }
    });

    return data;
};

export const buildArticleBlocks = (articleContent) => {
    const { content: docContent } = articleContent;

    if (!docContent || !docContent.length) return [];

    return docContent
        .map((block) => {
            const { type, content, attrs } = block;

            switch (type) {
                case 'paragraph':
                    if (!content) return null;

                    return {
                        type: 'paragraph',
                        content: buildTextNode(content),
                        alignment: attrs?.textAlign,
                    };
                case 'DividerBlock':
                    return {
                        type: 'divider',
                        dividerType: attrs?.type,
                    };
                case 'ImageBlock':
                    return {
                        type: 'image',
                        ...attrs,
                    };
                case 'heading':
                    const { level, id, textAlign } = attrs;
                    return {
                        type: 'heading',
                        content: buildTextNode(content),
                        level,
                        id,
                        alignment: textAlign,
                    };
                case 'blockquote':
                    return {
                        type,
                        content: buildArticleBlocks(block),
                    };
                case 'orderedList':
                case 'bulletList':
                    return {
                        type,
                        content: content.map((item) => {
                            return buildArticleBlocks(item);
                        }),
                    };
                case 'codeBlock':
                case 'WarningBlock':
                    return {
                        type: type === 'WarningBlock' ? 'warning' : 'codeBlock',
                        content: buildTextNode(content),
                        attrs,
                    };
            }
        })
        .filter((item) => item);
};
