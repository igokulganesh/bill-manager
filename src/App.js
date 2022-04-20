// importing React components
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// importing External CSS 
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap css
import "primereact/resources/themes/mdc-light-indigo/theme.css"; // prime theme
import "primereact/resources/primereact.css";               // prime core css
import "primeicons/primeicons.css";                            // prime icons
import "primeflex/primeflex.css" ;                            // prime flex
import 'prismjs/themes/prism-coy.css';
import PrimeReact from 'primereact/api';

// importing internal css
import './assets/layout/layout.scss';

// importing packages needed
import { Tooltip } from 'primereact/tooltip';

// importing own components
import Topbar from './components/layout/Topbar';
import Menu from './components/layout/Menu';
import Footer from './components/layout/Footer';
import Config from './components/layout/Config';
import Dashboard from './components/Dashboard';
import Create from './components/core/Create' ;

function App(){
  const [layoutMode, setLayoutMode] = useState('static');
  const [layoutColorMode, setLayoutColorMode] = useState('light')
  const [inputStyle, setInputStyle] = useState('outlined');
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const copyTooltipRef = useRef();
  const location = useLocation();

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
      if (mobileMenuActive) {
          addClass(document.body, "body-overflow-hidden");
      } else {
          removeClass(document.body, "body-overflow-hidden");
      }
  }, [mobileMenuActive]);

  useEffect(() => {
      copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
  }, [location]);

  const onInputStyleChange = (inputStyle) => {
      setInputStyle(inputStyle);
  }

  const onRipple = (e) => {
      PrimeReact.ripple = e.value;
      setRipple(e.value)
  }

  const onLayoutModeChange = (mode) => {
      setLayoutMode(mode)
  }

  const onColorModeChange = (mode) => {
      setLayoutColorMode(mode)
  }

  const onWrapperClick = (event) => {
      if (!menuClick) {
          setOverlayMenuActive(false);
          setMobileMenuActive(false);
      }

      if (!mobileTopbarMenuClick) {
          setMobileTopbarMenuActive(false);
      }

      mobileTopbarMenuClick = false;
      menuClick = false;
  }

  const onToggleMenuClick = (event) => {
      menuClick = true;

      if (isDesktop()) {
          if (layoutMode === 'overlay') {
              if (mobileMenuActive === true) {
                  setOverlayMenuActive(true);
              }

              setOverlayMenuActive((prevState) => !prevState);
              setMobileMenuActive(false);
          }
          else if (layoutMode === 'static') {
              setStaticMenuInactive((prevState) => !prevState);
          }
      }
      else {
          setMobileMenuActive((prevState) => !prevState);
      }

      event.preventDefault();
  }

  const onSidebarClick = () => {
      menuClick = true;
  }

  const onMobileTopbarMenuClick = (event) => {
      mobileTopbarMenuClick = true;

      setMobileTopbarMenuActive((prevState) => !prevState);
      event.preventDefault();
  }

  const onMobileSubTopbarMenuClick = (event) => {
      mobileTopbarMenuClick = true;

      event.preventDefault();
  }

  const onMenuItemClick = (event) => {
      if (!event.item.items) {
          setOverlayMenuActive(false);
          setMobileMenuActive(false);
      }
  }
  const isDesktop = () => {
      return window.innerWidth >= 992;
  }

  const addClass = (element, className) => {
      if (element.classList)
          element.classList.add(className);
      else
          element.className += ' ' + className;
  }

  const removeClass = (element, className) => {
      if (element.classList)
          element.classList.remove(className);
      else
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': layoutMode === 'overlay',
      'layout-static': layoutMode === 'static',
      'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
      'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive,
      'p-input-filled': inputStyle === 'filled',
      'p-ripple-disabled': ripple === false,
      'layout-theme-light': layoutColorMode === 'light'
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
      <Topbar 
        onToggleMenuClick={onToggleMenuClick} 
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive} 
        onMobileTopbarMenuClick={onMobileTopbarMenuClick} 
        onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} 
      />

      <div className="layout-sidebar" onClick={onSidebarClick}>
          <Menu onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
      </div>

      <div className="layout-main-container">
        <div className="layout-main">
          <Routes>
              <Route path="/" element={<Dashboard/>} exact />
              <Route path='/addCustomer' element={<Create label='its Worked'/>} />
          </Routes>
          <Footer layoutColorMode={layoutColorMode} />
        </div>
      </div>

      <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
        <div className="layout-mask p-component-overlay"></div>
      </CSSTransition>

    </div>
  ); 

}

export default App ; 