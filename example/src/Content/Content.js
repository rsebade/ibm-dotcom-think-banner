/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
import {
  CalloutQuote,
  CalloutWithMedia,
  ContentBlockCards,
  ContentBlockSegmented,
  ContentGroupHorizontal,
  CTASection,
  Layout,
  LeadSpaceBlock,
  TableOfContents,
} from '@carbon/ibmdotcom-react';

import React from 'react';

/**
 * DDS patterns template
 *
 * @returns {*} JSX for Learn template
 */
const Content = () => (
  <>
    <TableOfContents menuLabel="Jump to" theme="white" stickyOffset="48">
      <a name="section-1" data-title="Lorem ipsum dolor sit amet" />
      <Layout type="2-1">
        <div>
          <LeadSpaceBlock
            title="Lorem ipsum dolor sit amet"
            copy="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            heading="Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
            mediaType="video"
            mediaData={{
              videoId: '1_9h94wo6b',
              showDescription: true,
            }}
            items={{
              heading: 'Featured products',
              items: [
                {
                  type: 'local',
                  copy: 'IBM Cloud Continuous Delivery',
                  cta: {
                    href: 'https://ibm.com',
                  },
                },
                {
                  type: 'local',
                  copy: 'UrbanCode',
                  cta: {
                    href: 'https://ibm.com',
                  },
                },
                {
                  type: 'local',
                  copy: 'View all products',
                  cta: {
                    href: 'https://ibm.com',
                  },
                },
              ],
            }}
            cta={{
              style: 'button',
              type: 'local',
              buttons: [
                {
                  type: 'local',
                  copy: 'Excepteur sint occaecat',
                  href: 'https://example.com/',
                },
              ],
            }}
          />
        </div>
        <></>
      </Layout>

      <a
        name="section-2"
        data-title="Pharetra pharetra massa massa ultricies mi quis."
      />
      <ContentBlockSegmented
        heading="Pharetra pharetra massa massa ultricies mi quis."
        items={[
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
            cta: {
              type: 'local',
              copy: 'Lorem Ipsum dolor sit',
              href: 'https://example.com',
            },
          },
          {
            heading: 'A scelerisque purus semper eget duis at tellus.',
            copy:
              'Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.',
          },
        ]}
      />

      <CalloutWithMedia
        heading="Mauris ultrices eros in cursus"
        copy="Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada proin libero nunc consequat. In est ante in nibh mauris cursus mattis. Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat est velit egestas dui."
        mediaType="video"
        mediaData={{
          videoId: '1_9h94wo6b',
        }}
      />

      <a name="section-6" data-title="Aliquam condimentum interdum" />
      <ContentBlockCards
        heading="Aliquam condimentum interdum"
        cards={[
          {
            eyebrow: 'Topic',
            heading: 'Natural language processing.',
            cta: {
              href: 'https://www.example.com',
            },
          },
          {
            eyebrow: 'Topic',
            heading: 'Natural language processing.',
            cta: {
              href: 'https://www.example.com',
            },
          },
          {
            eyebrow: 'Topic',
            heading: 'Natural language processing.',
            cta: {
              href: 'https://www.example.com',
            },
          },
        ]}
      />

    </TableOfContents>
    <div className="bx--grid" style={{ backgroundColor: '#f4f4f4' }}>
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-4">
          <CTASection
            theme="g10"
            cta={{
              style: 'button',
              type: 'local',
              buttons: [
                {
                  type: 'local',
                  copy: 'Contact sales',
                  href: 'https://example.com/',
                },
              ],
            }}
            items={[
              {
                heading: 'Get connected',
                copy:
                  'IBM DevOps partners have a wide range of expertise. Find one to build the right solution for you.',
                cta: {
                  copy: 'Find a partner',
                  type: 'local',
                  href: 'https://example.com/',
                },
              },
              {
                heading: 'Learn how',
                copy:
                  'Dig into more self-directed learning about DevOps methodologies.',
                cta: {
                  copy: 'Browse tutorials',
                  type: 'local',
                  href: 'https://example.com/',
                },
              },
            ]}
            heading="Take the next step"
            copy="Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs."
          />
        </div>
      </div>
    </div>
  </>
);

export default Content;
