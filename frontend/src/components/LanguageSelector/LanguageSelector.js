import React, { useEffect, useState } from 'react';
import i18n from '../../i18n';
import './languageSwitch.css';
import useArticles from '../../hooks/useArticles';
const LanguageSelector = () => {
  const { setLang, lang } = useArticles();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); //contains the lang assigned in the i18n's index.js
  const languages = ['en', 'bg'];
  const [checked, setChecked] = useState(false);
  const handleLang = (lang) => {
    setLang(lang);
  };
  useEffect(() => {
    if (!checked) {
      i18n.changeLanguage(languages[0]); // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
      setSelectedLanguage(languages[0]);
      handleLang('en');
    } else {
      i18n.changeLanguage(languages[1]); // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
      setSelectedLanguage(languages[1]);
      handleLang('bg');
    }
  }, [checked]);
  return (
    <div>
      <label className="sliderLabel">
        <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
        <span className="slider">
          <span className="sliderOn"></span>
          <span className="sliderOff"></span>
          <span className="sliderBlock">
            <svg
              width="24"
              height="24"
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 200 63C 200 63 200 63 200 63C 221 63 238 79 238 100C 238 116 227 130 213 135C 213 135 213 182 213 182C 226 177 247 170 271 163C 312 150 363 138 400 138C 437 138 472 151 504 163C 537 176 569 188 600 188C 631 188 681 175 722 163C 763 151 796 138 796 138C 804 135 812 141 812 150C 812 150 812 525 812 525C 812 530 809 535 804 537C 804 537 771 549 729 562C 688 575 637 588 600 588C 563 588 528 574 496 562C 463 549 431 538 400 538C 369 538 319 550 278 562C 249 571 225 579 213 584C 213 584 213 900 213 900C 213 907 207 913 200 913C 193 913 187 907 188 900C 188 900 188 575 188 575C 188 575 188 200 188 200C 188 200 188 200 188 200C 188 200 188 135 188 135C 173 130 163 116 163 100C 163 79 179 63 200 63M 400 163C 400 163 400 163 400 163C 369 163 319 175 278 187C 245 197 222 205 213 209C 213 209 213 557 213 557C 226 552 245 546 271 538C 312 525 363 512 400 512C 437 512 472 526 504 538C 537 551 569 563 600 563C 631 563 681 550 722 538C 755 528 778 520 788 516C 788 516 788 168 788 168C 774 173 755 179 729 187C 688 200 637 213 600 213C 563 213 528 199 496 187C 463 174 431 163 400 163" />
            </svg>
          </span>
        </span>
      </label>
    </div>
  );
};

export default LanguageSelector;
