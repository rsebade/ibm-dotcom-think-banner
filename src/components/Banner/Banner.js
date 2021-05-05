/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';

import { ArrowRight24 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import BannerAPI from '../../services/Banner/Banner';
import { LocaleAPI } from '@carbon/ibmdotcom-services';
import root from 'window-or-global';

const stablePrefix = "dds";
const prefix = "bx";

class Banner extends Component {

  constructor(props){
    super(props);
    this.state = {
      bandData: {},
      locale: 'en',
      scrolledBelow: false,
      handleResize: null,
      handleScroll: null,
      docObserver: null
    }

    this.bannerRef = React.createRef();

    this.setBandData = this.setBandData.bind(this);
    this.setLocale = this.setLocale.bind(this);
    this.changeMastheadClasses = this.changeMastheadClasses.bind(this);
  }

  componentDidMount() {
    if (this.props.customData) {
      this.setBandData(this.props.customData);
    } else {
        BannerAPI.getTranslation().then(res => {
          //Banner API returns an object if it's already in session storage, or an HTTP response if not. Check to see which and store the data in the state.
          if(res.data) {
            this.setBandData(res.data.thinkBanner);
          } else {
            this.setBandData(res.thinkBanner);
          }
          //Apply initial classes and styles
          this.changeMastheadClasses();

          //Setup variables for the mutation observer
          let self = this;
          let masthead = root.document.querySelector('.bx--masthead');
          let mastheadHeight = masthead.offsetHeight;
          let l0height = root.document.querySelector('.bx--masthead__l0').offsetHeight;
          let bannerHeight = this.bannerRef.current.offsetHeight;

          //Create a mutation observer to manipulate the DOM after React changes state in the Carbon Masthead
          var observer = new MutationObserver(function() {
            //The overflow menu gets added to the DOM on trigger, so need to manipulate it here
            let overflowMenu = root.document?.querySelector('.bx--overflow-menu-options--open');
            if(overflowMenu){
              let offset = bannerHeight - root.pageYOffset + (l0height)
              offset = offset < l0height ? l0height : offset;
              overflowMenu.style.top = `${offset}px`;
            }
            //Trigger the function to re-add classes and styling if something in the DOM has been changed by react
            self.changeMastheadClasses();
          })
          observer.observe(root.document.body, {
            childList: true,
            subtree:true
          })

          //Set up scroll handler, we'll tell the component if the scroll position is outside the banner viewport, and change any styles/classes if necessary
          if(masthead){
            const handleScroll = root.addEventListener('scroll', () => {
              this.setIsScrolledBelowAnnouncement(root.pageYOffset > this.bannerRef.current.offsetHeight, this.bannerRef.current.offsetHeight);
              // 400 is an arbitrary threshold where if an L1 exists it will have hidden the L0. If we're above that 400px threshold we'll want to adjust the classes + styles.
              if (root.pageYOffset < 400) {
                this.changeMastheadClasses();
              }
            });

            //Set up resize handler, we'll tell the component if the scroll position is outside the banner viewport, and change any styles/classes if necessary
            const handleResize = root.addEventListener('resize', () => {
              this.setIsScrolledBelowAnnouncement(root.pageYOffset > this.bannerRef.current.offsetHeight, this.bannerRef.current.offsetHeight);
              // 400 is an arbitrary threshold where if an L1 exists it will have hidden the L0. If we're above that 400px threshold we'll want to adjust the classes + styles.
              if (root.pageYOffset < 400) {
                this.changeMastheadClasses();
              }
            });
            //Set our handlers in the state so we can destroy them correctly on dismount
            this.setState({
              ...this.state,
              handleScroll: handleScroll,
              handleResize: handleResize,
              docObserver: observer
            })
          }
        })
        //Call the LocaleAPI to render the correct language in the component, once fetched we'll set it in the component state
        LocaleAPI.getLocale().then(res => {
          this.setLocale(res.lc);
        })
    }
  }

  // This function handles our class and styling DOM changes
  changeMastheadClasses() {

    //Set megamenuArray as we'll manipulate it in multiple spots
    let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
    let megamenuLength = megamenuArray.length;

    //This if statement checks if the user has scrolled outside the viewport of the banner, and adds/removes classes based on that.
    if(this.state.scrolledBelow) {
      root.document?.querySelector('.bx--masthead')?.classList.remove(`bx--masthead__announcement-adjustment`)
      root.document?.querySelector('.bx--side-nav__navigation')?.classList.remove(`bx--side-nav__announcement-adjustment`)
      root.document?.querySelector('.bx--overflow-menu-options--open')?.classList.remove(`bx--overflow-menu-options--open__announcement-adjustment`)
      for(let i = 0; i < megamenuLength; i++) {
        megamenuArray[i].classList.add('bx--header__menu-announcement-adjustment')
      }
    } else {
      root.document.querySelector('.bx--masthead').classList.add(`bx--masthead__announcement-adjustment`)
      root.document?.querySelector('.bx--side-nav__navigation')?.classList.add(`bx--side-nav__announcement-adjustment`)
      root.document?.querySelector('.bx--overflow-menu-options--open')?.classList.add(`bx--overflow-menu-options--open__announcement-adjustment`)
      for(let i = 0; i < megamenuLength; i++) {
        megamenuArray[i].classList.add('bx--header__menu-announcement-adjustment')
      }
    }
    let mastheadHeight = root.document.querySelector('.bx--masthead').offsetHeight;
    let l0height = root.document.querySelector('.bx--masthead__l0').offsetHeight;
    let bannerHeight = this.bannerRef.current.offsetHeight;
    let mastheadOffset = root.document?.querySelector('.bx--masthead--sticky.bx--masthead--sticky__l1') ? -48 : 0;
    if (root.pageYOffset < 400) {
      let offset = this.bannerRef?.current.offsetHeight - root.pageYOffset + (mastheadHeight) + mastheadOffset;
      // The conditional below corrects for when the user has scrolled below the banner but might not have scrolled low enough for an L0 to disappear (if the L1 is available). It will set a higher offset if both are in view.
      offset = offset < (mastheadHeight + mastheadOffset) ? (mastheadHeight + mastheadOffset) : offset;
      // Adjusting for L0 border
      offset = offset - 1;
      // Grab the list of megamenu nodes, and apply the offset as their top styling
      for(let i = 0; i < megamenuLength; i++) {
        megamenuArray[i].style.top = `${offset}px`;
      }
    }
    // This conditional checks to see if the overflow menu exists, and if it does adjust it like we do the megamenus
    let overflowMenu = root.document?.querySelector('.bx--overflow-menu-options--open');
    if(overflowMenu){
      let offset = bannerHeight - root.pageYOffset + (l0height)
      offset = offset < l0height ? l0height : offset;
      overflowMenu.style.top = `${offset}px`;
    }
  }

  // Helper function to set the band data from the API
  setBandData(data) {
    this.setState({
      ...this.state,
      bandData: data
    })
  }

  // Helper function to set the locale from the API
  setLocale(data) {
    this.setState({
      ...this.state,
      locale: data
    })
  }

  // Helper function to set scrolled below boolean to state
  setIsScrolledBelowAnnouncement(bool) {
    this.setState({
      ...this.state,
      scrolledBelow: bool
    })
  }

  componentWillUnmount() {
    root.removeEventListener('resize', this.state.handleResize);
    root.removeEventListener('scroll', this.state.handleScroll);
    this.state.docObserver.disconnect();
  }

  render() {
    let locale = this.state.locale;
    if (this.state.bandData?.active) {
      var videoString = null;
      if (this.state.bandData.content[locale ? locale : 'en'].videoUrl) {
        videoString = (
          <div className="video-background">
            <video autoPlay="autoplay" muted>
              <source
                type="video/webm"
                src={this.state.bandData.content[locale ? locale : 'en'].videoUrl}
              />
              {this.state.bandData.content[locale ? locale : 'en'].videoUrl2 && (
                <source
                  type="video/mp4"
                  src={this.state.bandData.content[locale ? locale : 'en'].videoUrl2}
                />
              )}
            </video>
          </div>
        );
      }
      return (
        <div
          data-autoid={`${stablePrefix}--announcement-banner`}
          id="think-banner-container" ref={this.bannerRef}>
          <a
            id="think-banner-link"
            className="ibm-blocklink ibm-alternate-background"
            href={this.state.bandData.content[locale ? locale : 'en'].ctaUrl}>
            <div id="think-banner-content">
              <div className={`ibm-columns ${prefix}--grid ibm-padding-bottom-0`}>
                <div id="think-banner-desktop">
                  {videoString}
                  <div className="flex align-center think-counter__container">
                    <div>
                      <span
                        className="ibm-bold ibm-h4-small counter-text"
                        dangerouslySetInnerHTML={{
                          __html: `${
                            this.state.bandData.content[locale ? locale : 'en']
                              .bannerTextLive1
                          } <br/>${
                            this.state.bandData.content[locale ? locale : 'en']
                              .bannerTextLive2
                          }`,
                        }}></span>
                    </div>
                  </div>
                  <Button renderIcon={ArrowRight24}>
                    {this.state.bandData.content[locale ? locale : 'en'].ctaLabel}
                  </Button>
                </div>
                <div id="think-banner-mobile">
                  <div className="flex align-center space-between">
                    <div className="flex align-center space-between">
                      <div className="flex align-center">
                        <div>
                          <span
                            className="ibm-bold ibm-h4-small counter-text"
                            dangerouslySetInnerHTML={{
                              __html: `${
                                this.state.bandData.content[locale ? locale : 'en']
                                  .bannerTextLive1
                              } <br/>${
                                this.state.bandData.content[locale ? locale : 'en']
                                  .bannerTextLive2
                              }`,
                            }}></span>
                        </div>
                      </div>
                      <ArrowRight24 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Banner;
