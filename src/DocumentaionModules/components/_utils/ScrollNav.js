import React, { Component } from 'react';

const isBrowser = typeof window !== 'undefined';
const SCROLLSPY_NAV_NAMESPACE = 'react-scrollspy-nav';

/**
 * ScrollspyNav component. Refer to below for the props it receives
 */
class ScrollspyNav extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.scrollTargetIds = this.props.scrollTargetIds;
        this.activeNavClass = this.props.activeNavClass;
        this.scrollDuration = Number(this.props.scrollDuration) || 1000;
        this.headerBackground = this.props.headerBackground === 'true' ? true : false;
        this.offset = this.props.offset || 0;
        this.scroller = this.props.scroller || null;

        this.onScroll = this.onScroll.bind(this);

        if (this.props.router && this.props.router === 'HashRouter') {
            this.homeDefaultLink = '#/';
            this.hashIdentifier = '#/#';
        } else {
            this.homeDefaultLink = '/';
            this.hashIdentifier = '#';
        }
    }

    getSectionDom(sectionID) {
        let ele = document.getElementById(sectionID);

        if (!ele) {
            ele = document.querySelector(`[data-id='${sectionID}']`);
        }

        return ele;
    }

    /**
     * Scroll event handler. It checks the current window offset and compares it with the pageYOffset of each
     *  target sections. It highlights the nav link when scrolling to a corresponding section
     */
    onScroll() {
        let scrollSectionOffsetTop;

        this.props.scrollTargetIds.forEach((sectionID, index) => {
            if (!this.getSectionDom(sectionID)) {
                console.warn(`${SCROLLSPY_NAV_NAMESPACE}: no element with id ${sectionID} present in the DOM`);
                return;
            }

            let section = this.getSectionDom(sectionID);

            let top = section.getBoundingClientRect().top + window.scrollY + this.offset;

            scrollSectionOffsetTop = top - (this.headerBackground ? document.querySelector("nav[data-nav='list']").scrollHeight : 0);

            if (this.scroller) {
                if (scrollSectionOffsetTop + this.offset <= this.scroller.getBoundingClientRect().top - this.offset) {
                    this.getNavLinkElement(sectionID).classList.add(this.activeNavClass);
                    this.clearOtherNavLinkActiveStyle(sectionID);
                }
            } else {
                if (isBrowser && window.pageYOffset - this.offset >= scrollSectionOffsetTop && window.pageYOffset < scrollSectionOffsetTop + section.scrollHeight) {
                    this.getNavLinkElement(sectionID).classList.add(this.activeNavClass);
                    this.clearOtherNavLinkActiveStyle(sectionID);
                }
                // else {
                //     this.getNavLinkElement(sectionID).classList.remove(this.activeNavClass);
                // }

                if (isBrowser && window.innerHeight + window.pageYOffset >= document.body.scrollHeight && index === this.props.scrollTargetIds.length - 1) {
                    this.getNavLinkElement(sectionID).classList.add(this.activeNavClass);
                    this.clearOtherNavLinkActiveStyle(sectionID);
                }
            }
        });
    }

    easeInOutQuad(current_time, start, change, duration) {
        current_time /= duration / 2;
        if (current_time < 1) return (change / 2) * current_time * current_time + start;
        current_time--;
        return (-change / 2) * (current_time * (current_time - 2) - 1) + start;
    }

    /**
     * Perform scroll animation with given start place, end place and duration
     * @param {Number} start
     * @param {Number} to
     * @param {Number} duration
     */
    scrollTo(start, to, duration) {
        let change = to - start,
            currentTime = 0,
            increment = 10;

        let animateScroll = () => {
            currentTime += increment;
            let val = this.easeInOutQuad(currentTime, start, change, duration);
            isBrowser && window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    /**
     * Get the nav link element with a given sectionID that the nav link links to
     * @param {String} sectionID
     */
    getNavLinkElement(sectionID) {
        return document.querySelector(`a[href='${this.hashIdentifier}${sectionID}']`);
    }

    /**
     * Given a nav href url, get its clean sectionID based on if there is hash router identifier or not
     * @param {String} navHref
     */
    getNavToSectionID(navHref) {
        return navHref.includes(this.hashIdentifier) ? navHref.replace(this.hashIdentifier, '') : '';
    }

    /**
     * Clear the highlight style on the non-current viewed nav elements
     * @param {String} excludeSectionID
     */
    clearOtherNavLinkActiveStyle(excludeSectionID) {
        this.props.scrollTargetIds.map((sectionID, index) => {
            if (sectionID !== excludeSectionID) {
                this.getNavLinkElement(sectionID).classList.remove(this.activeNavClass);
            }
        });
    }

    register() {
        if (document.querySelector(`a[href='${this.homeDefaultLink}#']`)) {
            document.querySelector(`a[href='${this.homeDefaultLink}#']`).addEventListener('click', (event) => {
                event.preventDefault();
                isBrowser && this.scrollTo(window.pageYOffset, 0, this.scrollDuration);
                if (isBrowser) {
                    window.location.hash = '';
                }
            });
        }

        document
            .querySelector("nav[data-nav='list']")
            .querySelectorAll('a')
            .forEach((navLink) => {
                navLink.addEventListener('click', (event) => {
                    event.preventDefault();

                    let sectionID = this.getNavToSectionID(navLink.getAttribute('href'));

                    if (sectionID) {
                        if (this.getSectionDom(sectionID)) {
                            let scrollTargetPosition = this.scroller
                                ? this.getSectionDom(sectionID).offsetTop - (this.headerBackground ? document.querySelector("nav[data-nav='list']").scrollHeight : 0)
                                : this.getSectionDom(sectionID).getBoundingClientRect().top + window.scrollY;

                            if (this.scroller) {
                                this.scroller.scroll({
                                    top: scrollTargetPosition - this.offset,
                                    behavior: 'smooth'
                                });
                            } else {
                                isBrowser && this.scrollTo(window.pageYOffset, scrollTargetPosition + this.offset, this.scrollDuration);
                            }
                        } else {
                            console.warn(`${SCROLLSPY_NAV_NAMESPACE}: no element with id ${sectionID} present in the DOM`);
                        }
                    } else {
                        isBrowser && this.scrollTo(window.pageYOffset, 0, this.scrollDuration);
                    }
                });
            });
    }

    componentDidMount() {
        this.register();

        if (this.scroller) this.scroller.addEventListener('scroll', this.onScroll);
        else isBrowser && window.addEventListener('scroll', this.onScroll);
    }

    componentDidUpdate(preProps) {
        if (JSON.stringify(preProps?.scrollTargetIds) !== JSON.stringify(this.props.scrollTargetIds)) {
            if (this.scroller) this.scroller.removeEventListener('scroll', this.onScroll);
            else window.removeEventListener('scroll', this.onScroll);

            this.register();

            if (this.scroller) this.scroller.addEventListener('scroll', this.onScroll);
            else isBrowser && window.addEventListener('scroll', this.onScroll);
        }
    }

    componentWillUnmount() {
        if (this.scroller) this.scroller.removeEventListener('scroll', this.onScroll);
        else window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        return <nav data-nav='list'>{this.props.children}</nav>;
    }
}

export default ScrollspyNav;
