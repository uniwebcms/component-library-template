import './index.css';
import Section from './components/Section';
import Header from './components/Header';
import DynamicSection from './components/DynamicSection';
import Citation from './components/Citation';

export default { Header, Section, DynamicSection, Citation };

export const site = {
    report: {
        type: 'docx',
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 22,
                        color: '000000'
                    },
                    paragraph: {
                        spacing: {
                            before: 180,
                            after: 180
                        },
                        alignment: 'center'
                    }
                },
                heading2: {
                    run: {
                        size: 23,
                        color: '000000'
                    },
                    paragraph: {
                        spacing: {
                            before: 140,
                            after: 140
                        },
                        alignment: 'center'
                    }
                },
                heading3: {
                    run: {
                        size: 23,
                        bold: true,
                        color: '000000',
                        underline: {
                            type: 'single',
                            color: '000000'
                        }
                    },
                    paragraph: {
                        spacing: {
                            before: 260,
                            after: 200
                        },
                        alignment: 'center'
                    }
                },
                heading4: {
                    run: {
                        size: 22,
                        color: '2b2b2b'
                    },
                    paragraph: {
                        spacing: { before: 120, after: 120 }
                    }
                },
                document: {
                    run: {
                        size: 22
                    },
                    paragraph: {
                        alignment: 'both'
                    }
                }
            },
            paragraphStyles: [
                {
                    id: 'twoColumnLayout',
                    name: 'Two Column Layout',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: {
                            hanging: 4268,
                            left: 4268
                        }
                    }
                },
                {
                    id: 'twoColumnLayoutWide',
                    name: 'Two Column Layout (Wide)',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: {
                            hanging: 6268,
                            left: 6268
                        }
                    }
                },
                {
                    id: 'twoLevelIndentation',
                    name: 'Two Level Indentation',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: {
                            hanging: 2860,
                            left: 3200
                        },
                        tabStops: [
                            {
                                position: 2834,
                                type: 'left'
                            },
                            {
                                position: 2835,
                                type: 'left'
                            }
                        ]
                    }
                },
                {
                    id: 'reversedList',
                    name: 'Reversed List',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: { left: 1162, hanging: 850 },
                        tabStops: [{ type: 'left', position: 850 }]
                    }
                },
                {
                    id: 'leftIndentation',
                    name: 'Left Indentation',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: {
                            left: 340
                        }
                    }
                },
                {
                    id: 'groupTitle',
                    name: 'Group Title',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: {
                            left: 340
                        }
                    }
                },
                {
                    id: 'groupItems',
                    name: 'Group Items',
                    basedOn: 'Normal',
                    next: 'Normal',
                    quickFormat: true,
                    paragraph: {
                        indent: {
                            left: 2350,
                            hanging: 650
                        }
                    }
                }
            ]
        },
        numbering: {
            config: [
                {
                    reference: 'numbering',
                    levels: [
                        {
                            level: 0,
                            format: 'decimal',
                            text: '%1.',
                            alignment: 'left',
                            style: {
                                paragraph: {
                                    indent: { left: 1162, hanging: 850 },
                                    tabStops: [{ type: 'left', position: 850 }]
                                }
                            }
                        }
                    ]
                },
                {
                    reference: 'en-dash',
                    levels: [
                        {
                            level: 0,
                            format: 'bullet',
                            text: '–',
                            alignment: 'left',
                            style: {
                                paragraph: {
                                    indent: { left: 1162, hanging: 850 },
                                    tabStops: [{ type: 'left', position: 850 }]
                                }
                            }
                        }
                    ]
                }
            ]
        },
        addSectionSpacing: false,
        downloadOptions: []
    }
};
