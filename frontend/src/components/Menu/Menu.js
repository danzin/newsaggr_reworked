import React, { useState } from 'react';
import './menu.css';
import { useArticles } from '../../hooks/useArticles';
import useAuth from '../../hooks/useAuth';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';
const Menu = () => {
  const { t } = useTranslation();
  const { setCategory } = useArticles();
  const [visible, setVisible] = useState(false);
  const { auth } = useAuth();

  const handleMenuItemClick = (event) => {
    console.log(event.target.dataset.category);
    setCategory(() => [event.target.dataset.category]);
  };
  const handleVisibility = () => {
    setVisible(!visible);
    console.log(visible);
  };

  const userCats = () => {
    console.log(auth.categories);
    setCategory((c) => [auth.categories]);
  };

  return (
    <>
      <button
        className="mobile-nav-toggle"
        aria-controls="navigation"
        aria-expanded="false"
        onClick={handleVisibility}
      >
        {/* <span className="sr-only">Menu</span> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.5em"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </button>
      <nav className={visible ? 'menu visible' : 'menu'} id="navigation">
        <ul className="menu__nav">
          {/* <li className="menu__nav-item">
          <a href="" className="menu__nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <span className="link-text">Profile</span>
          </a>
        </li> */}
          <li className="menu__nav-item">
            <div className="menu__nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 459 201C 478 224 504 260 525 218C 591 132 723 109 816 167C 910 220 952 347 908 446C 883 505 832 545 791 592C 715 673 640 755 563 836C 536 864 489 877 456 851C 419 822 390 784 357 750C 285 673 213 595 140 518C 120 498 99 466 88 436C 50 334 97 210 194 161C 279 114 391 131 459 201C 459 201 459 201 459 201M 176 236C 107 301 109 422 178 486C 277 591 374 697 473 801C 497 830 528 804 545 783C 642 677 741 573 838 468C 899 394 882 274 804 219C 731 162 617 178 562 252C 541 280 501 310 468 281C 433 251 406 208 359 195C 297 172 223 189 176 236C 176 236 176 236 176 236" />
              </svg>
              <span className="link-text" onClick={userCats}>
                {t('Favourites')}
              </span>
            </div>
            <div className="menu__nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 750 75C 764 75 775 86 775 100C 775 100 775 875 775 875C 775 875 800 875 800 875C 814 875 825 886 825 900C 825 914 814 925 800 925C 800 925 200 925 200 925C 186 925 175 914 175 900C 175 886 186 875 200 875C 200 875 225 875 225 875C 225 875 225 100 225 100C 225 86 236 75 250 75C 250 75 750 75 750 75M 275 875C 275 875 437 875 437 875C 437 875 437 725 437 725C 438 718 443 713 450 713C 450 713 550 713 550 713C 557 713 562 718 563 725C 563 725 563 875 563 875C 563 875 725 875 725 875C 725 875 725 125 725 125C 725 125 275 125 275 125C 275 125 275 875 275 875M 450 188C 457 188 462 193 462 200C 462 200 462 300 462 300C 462 307 457 312 450 312C 450 312 350 312 350 312C 343 312 338 307 337 300C 337 300 337 200 337 200C 338 193 343 188 350 188C 350 188 450 188 450 188M 650 188C 657 188 662 193 663 200C 663 200 663 300 663 300C 662 307 657 312 650 312C 650 312 550 312 550 312C 543 312 538 307 538 300C 538 300 538 200 538 200C 538 193 543 188 550 188C 550 188 650 188 650 188M 450 362C 457 363 462 368 462 375C 462 375 462 475 462 475C 462 482 457 487 450 487C 450 487 350 487 350 487C 343 487 338 482 337 475C 337 475 337 375 337 375C 338 368 343 363 350 362C 350 362 450 362 450 362M 650 362C 657 363 662 368 663 375C 663 375 663 475 663 475C 662 482 657 487 650 487C 650 487 550 487 550 487C 543 487 538 482 538 475C 538 475 538 375 538 375C 538 368 543 363 550 362C 550 362 650 362 650 362M 450 538C 457 538 462 543 462 550C 462 550 462 650 462 650C 462 657 457 662 450 663C 450 663 350 663 350 663C 343 662 338 657 337 650C 337 650 337 550 337 550C 338 543 343 538 350 538C 350 538 450 538 450 538M 650 538C 657 538 662 543 663 550C 663 550 663 650 663 650C 662 657 657 662 650 663C 650 663 550 663 550 663C 543 662 538 657 538 650C 538 650 538 550 538 550C 538 543 543 538 550 538C 550 538 650 538 650 538" />
              </svg>
              <span
                className="link-text"
                onClick={handleMenuItemClick}
                id="business"
                data-category="business,finance"
              >
                {t('Business') + ' & ' + t('Finance')}
              </span>
            </div>
          </li>
          <li className="menu__nav-item">
            <div className="menu__nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 900 63C 948 63 987 102 987 150C 987 150 987 850 987 850C 987 898 948 937 900 937C 900 937 650 937 650 937C 602 937 563 898 563 850C 563 850 563 150 563 150C 563 102 602 63 650 63C 650 63 900 63 900 63M 638 150C 638 150 638 850 638 850C 638 858 642 862 650 862C 650 862 900 862 900 862C 908 862 912 858 912 850C 912 850 912 150 912 150C 912 142 908 138 900 138C 900 138 650 138 650 138C 642 138 638 142 638 150C 638 150 638 150 638 150M 500 163C 521 162 538 179 538 200C 538 221 521 238 500 238C 500 238 88 238 88 238C 88 238 88 713 88 713C 88 713 500 713 500 713C 521 712 538 729 538 750C 538 771 521 788 500 788C 500 788 50 788 50 788C 29 787 13 771 13 750C 13 750 13 200 13 200C 13 179 29 163 50 163C 50 163 500 163 500 163M 850 213C 871 212 888 229 888 250C 888 271 871 288 850 287C 850 287 700 287 700 287C 679 288 662 271 662 250C 662 229 679 212 700 213C 700 213 850 213 850 213M 813 663C 813 683 796 700 775 700C 754 700 737 683 737 663C 737 642 754 625 775 625C 796 625 813 642 813 663C 813 663 813 663 813 663M 500 862C 521 862 538 879 538 900C 538 921 521 938 500 937C 500 937 200 937 200 937C 179 938 162 921 162 900C 162 879 179 862 200 862C 200 862 500 862 500 862" />
              </svg>
              <span
                className="link-text"
                onClick={handleMenuItemClick}
                id="technology"
                data-category="technology"
              >
                {t('Technology')}
              </span>
            </div>
          </li>

          <li className="menu__nav-item">
            <div className="menu__nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 725 300C 850 300 925 400 925 500C 925 600 850 700 725 700C 650 700 600 650 575 625C 575 625 425 625 425 625C 400 650 350 700 275 700C 150 700 75 600 75 500C 75 375 150 300 275 300C 275 300 725 300 725 300M 680 420C 680 444 700 464 725 464C 750 464 770 444 770 420C 770 395 750 375 725 375C 700 375 680 395 680 420C 680 420 680 420 680 420M 238 462C 238 462 175 462 175 462C 175 462 175 538 175 538C 175 538 238 538 238 538C 238 538 238 600 238 600C 238 600 312 600 312 600C 312 600 312 538 312 538C 312 538 375 538 375 538C 375 538 375 462 375 462C 375 462 312 462 312 462C 312 462 312 400 312 400C 312 400 238 400 238 400C 238 400 238 462 238 462M 600 500C 600 525 620 545 645 545C 669 545 689 525 689 500C 689 475 669 455 645 455C 620 455 600 475 600 500C 600 500 600 500 600 500M 761 500C 761 525 781 545 805 545C 830 545 850 525 850 500C 850 475 830 455 805 455C 781 455 761 475 761 500C 761 500 761 500 761 500M 680 580C 680 605 700 625 725 625C 750 625 770 605 770 580C 770 556 750 536 725 536C 700 536 680 556 680 580C 680 580 680 580 680 580" />
              </svg>
              <span
                className="link-text"
                onClick={handleMenuItemClick}
                id="gaming"
                data-category="gaming"
              >
                {t('Gaming')}
              </span>
            </div>
          </li>
          <li className="menu__nav-item">
            <div className="menu__nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 800 514C 773 514 751 535 751 562C 751 589 773 611 800 611C 813 611 825 606 835 597C 844 588 849 575 849 562C 849 549 844 537 835 528C 825 519 813 514 800 514C 800 514 800 514 800 514M 800 364C 773 364 751 385 751 412C 751 439 773 461 800 461C 813 461 825 456 835 447C 844 438 849 425 849 412C 849 399 844 387 835 378C 825 369 813 364 800 364C 800 364 800 364 800 364M 208 337C 190 337 175 352 175 371C 175 371 175 654 175 654C 175 673 190 686 208 687C 375 700 525 700 692 687C 710 686 725 673 725 654C 725 654 725 371 725 371C 725 352 710 339 692 337C 525 325 375 325 208 337M 249 112C 255 112 261 114 267 116C 267 116 501 233 501 233C 501 233 759 116 759 116C 772 110 786 111 797 119C 808 127 814 140 813 154C 811 167 803 179 791 184C 791 184 646 250 646 250C 646 250 850 250 850 250C 878 250 900 272 900 300C 900 300 900 725 900 725C 900 753 875 764 850 775C 850 775 840 775 840 775C 840 775 861 838 861 838C 865 851 862 865 853 875C 844 885 831 890 817 887C 804 884 794 875 789 862C 789 862 764 787 764 787C 763 783 762 779 762 775C 762 775 238 775 238 775C 238 779 237 783 236 787C 236 787 211 862 211 862C 206 875 196 884 183 887C 169 890 156 885 147 875C 138 865 135 851 139 838C 139 838 160 775 160 775C 160 775 150 775 150 775C 122 775 100 753 100 725C 100 725 100 300 100 300C 100 272 122 250 150 250C 150 250 366 250 366 250C 366 250 233 184 233 184C 218 176 209 159 213 142C 217 125 231 113 249 112C 249 112 249 112 249 112" />
              </svg>
              <span
                className="link-text"
                onClick={handleMenuItemClick}
                data-category="television,movies,tv"
              >
                {t('TV')}
              </span>
            </div>
          </li>
          <li className="menu__nav-item">
            <div className="menu__nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 837 163C 886 213 924 272 947 337C 949 339 950 342 950 345C 967 394 976 447 976 500C 976 559 965 616 945 670C 944 673 943 675 942 678C 918 737 883 791 837 837C 748 926 626 976 500 976C 374 976 252 926 163 837C 117 791 82 736 58 677C 56 675 55 672 55 670C 34 616 24 559 24 500C 24 446 33 392 51 342C 51 339 52 337 53 334C 77 271 114 212 163 163C 252 74 374 24 500 24C 626 24 748 74 837 163C 837 163 837 163 837 163M 442 101C 422 120 402 151 385 191C 368 228 355 273 346 322C 346 322 654 323 654 323C 645 274 632 229 615 191C 598 151 578 120 558 101C 537 82 518 74 500 74C 482 74 463 82 442 101C 442 101 442 101 442 101M 199 199C 163 234 134 276 113 321C 113 321 295 322 295 322C 305 267 320 215 339 171C 353 139 368 112 386 89C 316 109 251 146 199 199C 199 199 199 199 199 199M 661 171C 681 216 695 267 705 323C 705 323 888 324 888 324C 867 278 838 235 801 199C 749 146 684 109 614 89C 632 112 647 139 661 171C 661 171 661 171 661 171M 74 500C 74 548 82 595 97 640C 97 640 289 640 289 640C 283 595 279 548 279 500C 279 456 282 413 287 372C 287 372 94 371 94 371C 80 413 74 456 74 500C 74 500 74 500 74 500M 329 500C 329 548 333 595 339 640C 339 640 661 640 661 640C 667 595 671 548 671 500C 671 457 668 414 662 373C 662 373 338 372 338 372C 332 413 329 456 329 500C 329 500 329 500 329 500M 721 500C 721 548 717 595 711 640C 711 640 903 640 903 640C 918 595 926 548 926 500C 926 457 920 414 907 374C 907 374 713 373 713 373C 718 414 721 457 721 500C 721 500 721 500 721 500M 199 801C 251 854 316 891 386 911C 368 888 353 861 339 829C 321 788 307 741 297 690C 297 690 118 690 118 690C 138 731 165 768 199 801C 199 801 199 801 199 801M 385 809C 402 849 422 880 442 899C 463 918 482 926 500 926C 518 926 537 918 558 899C 578 880 598 849 615 809C 630 775 643 734 652 690C 652 690 348 690 348 690C 357 734 370 775 385 809C 385 809 385 809 385 809M 661 829C 647 861 632 888 614 911C 684 891 749 854 801 801C 834 769 861 731 882 690C 882 690 703 690 703 690C 693 741 679 788 661 829C 661 829 661 829 661 829" />
              </svg>
              <span className="link-text">
                <LanguageSelector />
              </span>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;