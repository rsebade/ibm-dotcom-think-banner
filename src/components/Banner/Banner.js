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
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

class Banner extends Component {

  constructor(props){
    super(props);
    this.state = {
      bandData: {},
      locale: 'en',
      scrolledBelow: false,
      adjustAmount: root.innerWidth < 850 ? 75 : 106,
      handleResize: null,
      handleScroll: null,
      hasL1: root.document?.querySelector('.bx--masthead__l1'),
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
          if(res.data) {
            this.setBandData(res.data.thinkBanner);
          } else {
            this.setBandData(res.thinkBanner);
          }
          this.changeMastheadClasses();
          let masthead = root.document.querySelector('.bx--masthead');
          let self = this;
          let mastheadHeight = root.document.querySelector('.bx--masthead').offsetHeight;
          let l0height = root.document.querySelector('.bx--masthead__l0').offsetHeight;
          let bannerHeight = this.bannerRef.current.offsetHeight;
          var observer = new MutationObserver(function() {
            if(root.document?.querySelector('.bx--overflow-menu-options--open')){
              let offset = bannerHeight - root.pageYOffset + (l0height)
              offset = offset < l0height ? l0height : offset;
              root.document.querySelector('.bx--overflow-menu-options--open').style.top = `${offset}px`;
            }
            self.changeMastheadClasses();
          })
          observer.observe(root.document.body, {
            childList: true,
            subtree:true
          })

          if(root.document?.querySelector('.bx--masthead')){
            const handleScroll = root.addEventListener('scroll', () => {
              this.setIsScrolledBelowAnnouncement(root.pageYOffset > this.bannerRef.current.offsetHeight, this.bannerRef.current.offsetHeight);
              if (root.pageYOffset < 400) {
                this.changeMastheadClasses();
              }
            });

            const handleResize = root.addEventListener('resize', () => {
              this.setIsScrolledBelowAnnouncement(root.pageYOffset > this.bannerRef.current.offsetHeight, this.bannerRef.current.offsetHeight);
              if (root.pageYOffset < 400) {
                this.changeMastheadClasses();
              }
            });
            this.setState({
              ...this.state,
              handleScroll: handleScroll,
              handleResize: handleResize,
              docObserver: observer
            })
          }
          if(root.document?.querySelector('.bx--masthead__l1')){
            this.setState({
              ...this.state,
              hasL1: true
            })
          }
        })
        LocaleAPI.getLocale().then(res => {
          this.setLocale(res.lc);
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.scrolledBelow !== this.state.scrolledBelow) {
      this.changeMastheadClasses();
    }
  }

  changeMastheadClasses() {
    var i;
    if(this.state.scrolledBelow) {
      root.document?.querySelector('.bx--masthead')?.classList.remove(`bx--masthead__announcement-adjustment`)
      root.document?.querySelector('.bx--side-nav__navigation')?.classList.remove(`bx--side-nav__announcement-adjustment`)
      root.document?.querySelector('.bx--overflow-menu-options--open')?.classList.remove(`bx--overflow-menu-options--open__announcement-adjustment`)
      let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
      let length = megamenuArray.length;
      for(i = 0; i < length; i++) {
        megamenuArray[i].classList.add('bx--header__menu-announcement-adjustment')
      }
    } else {
      root.document.querySelector('.bx--masthead').classList.add(`bx--masthead__announcement-adjustment`)
      root.document?.querySelector('.bx--side-nav__navigation')?.classList.add(`bx--side-nav__announcement-adjustment`)
      root.document?.querySelector('.bx--overflow-menu-options--open')?.classList.add(`bx--overflow-menu-options--open__announcement-adjustment`)
      let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
      let length = megamenuArray.length;
      for(i = 0; i < length; i++) {
        megamenuArray[i].classList.add('bx--header__menu-announcement-adjustment')
      }
    }
    let mastheadHeight = root.document.querySelector('.bx--masthead').offsetHeight;
    let mastheadOffset = root.document?.querySelector('.bx--masthead--sticky.bx--masthead--sticky__l1') ? -48 : 0;
    if (root.pageYOffset < 400) {
      let offset = this.bannerRef?.current.offsetHeight - root.pageYOffset + (mastheadHeight) + mastheadOffset;
      offset = offset < (mastheadHeight + mastheadOffset) ? (mastheadHeight + mastheadOffset) : offset;
      let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
      let length = megamenuArray.length;
      for(var i = 0; i < length; i++) {
        megamenuArray[i].style.top = `${offset}px`;
      }
    }
  }

  setBandData(data) {
    this.setState({
      ...this.state,
      bandData: data
    })
  }

  setLocale(data) {
    this.setState({
      ...this.state,
      locale: data
    })
  }

  setIsScrolledBelowAnnouncement(bool, adjustAmount) {
    this.setState({
      ...this.state,
      scrolledBelow: bool,
      adjustAmount: adjustAmount
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
