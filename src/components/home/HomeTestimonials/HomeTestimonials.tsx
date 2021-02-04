/**
 * Section of the home page displaying different testimonials (real quotes!) from different former
 * SaintsXCTF athletes and users of the website.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';
import Testimonial from '../../shared/Testimonial';
import { FeatureFlag } from '../../shared/FeatureFlag';

const HomeTestimonials: React.FunctionComponent = () => {
  return (
    <div className="sxctf-home-testimonials" id="testimonials">
      <Testimonial
        src="/asset/thomas-c.jpg"
        name="Thomas Caulfield"
        title="2x Cross Country All-American, 1x Outdoor Track All-American"
        testimony="Yeah I guess this website is pretty cool"
      />
      <Testimonial
        src="/asset/lisa-g.jpg"
        name="Lisa Grohn"
        title="4x All-American"
        testimony="I love it!! I wish there was a place for me to log kale consumption though.."
      />
      <Testimonial src="/asset/evan-g.jpg" name="Evan Garvey" title="Kombucha Lover" testimony="What Lisa said." />
      <FeatureFlag flag="EXTRA_TESTIMONIALS">
        <Testimonial
          src="/asset/joe-s.jpg"
          name="Joe Smith"
          title="10th Place at 2015 Cross Country Nationals and #1 Red Sox Fan"
          testimony="I refuse to use this website as it was created in or around NYC."
        />
        <Testimonial
          src="/asset/ben-f.jpg"
          name="Ben Fishbein"
          title="Farmer"
          testimony="I don't surf the web too often but I sure do love planting carrots."
        />
      </FeatureFlag>
      <Testimonial src="/asset/trevor-b.jpg" name="Trevor Bibb" title="Athlete" testimony="Yeeeeeeeeehawwwwwwww" />
    </div>
  );
};

export default HomeTestimonials;
