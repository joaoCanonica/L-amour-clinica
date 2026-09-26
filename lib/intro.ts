export const INTRO_STORAGE_KEY = "lamour-intro-vista";

/**
 * Script inline (no <head>) que decide, antes da primeira pintura, se a
 * entrada roda: só na Home, uma vez por sessão e nunca com movimento
 * reduzido. Rede de segurança: se o JS não assumir em 6 s, a entrada sai.
 */
export const introBootScript = `(function(){var d=document.documentElement;try{if(location.pathname==='/'&&!sessionStorage.getItem('${INTRO_STORAGE_KEY}')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-play');setTimeout(function(){if(!window.__lamourIntro){d.classList.remove('intro-play')}},6000)}}catch(e){}})();`;
