/**
 * Section of the home page displaying different testimonials (real quotes!) from different former
 * SaintsXCTF athletes and users of the website.
 * @author Andrew Jarombek
 * @since 1/21/2020
 */

import React from 'react';
import Testimonial from './Testimonial';

const HomeTestimonials = () => {
  return (
    <div className="sxctf-home-testimonials">
      <Testimonial
        src="https://asset.saintsxctf.com/thomas-c.png"
        name="Thomas Caulfield"
        title="2x Cross Country All-American, 1x Outdoor Track All-American"
        testimony="Yeah I guess this website is pretty cool"/>
      <Testimonial
        src="https://asset.saintsxctf.com/lisa-g.png"
        name="Lisa Grohn"
        title="4x All-American"
        testimony="I love it!! I wish there was a place for me to log kale consumption though.."/>
      <Testimonial
        src="https://asset.saintsxctf.com/evan-g.png"
        name="Evan Garvey"
        title="Kombucha Lover"
        testimony="What Lisa said."/>
      <Testimonial
        src="https://asset.saintsxctf.com/joe-s.png"
        name="Joe Smith"
        title="10th Place at 2015 Cross Country Nationals and #1 Red Sox Fan"
        testimony="I refuse to use this website as it was created in or around NYC."/>
      <Testimonial
        src="https://asset.saintsxctf.com/ben-f.png"
        name="Ben Fishbein"
        title="Farmer"
        testimony="I don't surf the web too often but I sure do love planting carrots."/>
      <Testimonial
        src="https://asset.saintsxctf.com/trevor-b.png"
        name="Trevor Bibb"
        title="Athlete"
        testimony="Yeeeeeeeeehawwwwwwww"/>
    </div>
  );
};

export default HomeTestimonials;
