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
      handleScroll: null,
      hasL1: root.document?.querySelector('.bx--masthead__l1'),
      docObserver: null
    }
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
          var in_dom = root.document.body.contains(masthead);
          var observer = new MutationObserver(function() {
            if (document.body.contains(masthead)) {
                in_dom = true;
            } else if (in_dom) {
                in_dom = false;
                root.document.querySelector('.bx--masthead').classList.add(`bx--masthead__announcement-adjustment`)
            }
          })
          observer.observe(root.document.body, {
            childList: true
          })
          if(root.document?.querySelector('.bx--masthead')){
            const handleScroll = root.addEventListener('scroll', () => {
              if (root.innerWidth < 850) {
                this.setIsScrolledBelowAnnouncement(root.pageYOffset > 75, 75);
              } else {
                this.setIsScrolledBelowAnnouncement(root.pageYOffset > 106, 106);
              }
              if (root.pageYOffset < 106) {
                let offset = 106 - root.pageYOffset + (this.state.hasL1 ? 96 : 48)
                let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
                let length = megamenuArray.length;
                for(var i = 0; i < length; i++) {
                  megamenuArray[i].style.top = `${offset}px`;
                }
              }
            });
            this.setState({
              ...this.state,
              handleScroll: handleScroll,
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
      root.document?.querySelector('.bx--side-nav__navigation')?.classList.remove(`bx--side-nav__announcement-adjustment`);
      let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
      let length = megamenuArray.length;
      for(i = 0; i < length; i++) {
        megamenuArray[i].classList.add('bx--header__menu-announcement-adjustment')
      }
    } else {
      root.document.querySelector('.bx--masthead').classList.add(`bx--masthead__announcement-adjustment`)
      root.document?.querySelector('.bx--side-nav__navigation')?.classList.add(`bx--side-nav__announcement-adjustment`)
      let megamenuArray = root.document?.querySelectorAll('.bx--header__menu')
      let length = megamenuArray.length;
      for(i = 0; i < length; i++) {
        megamenuArray[i].classList.add('bx--header__menu-announcement-adjustment')
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
          id="think-banner-container">
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
