import { useEffect } from "react";

function ChatWidget() {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "35868eff209972ff0dfa1b7445be72c2f", // Reemplaza con tu APP_ID
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        widgetPosition: "left",
      };
      kommunicateSettings.onInit = function() {
        var css = `
            
          `; // Replace <YOUR_CSS_CODE_HERE> with the CSS you want to override.
        window.Kommunicate.customizeWidgetCss(css); // use window.Kommunicate for ReactJs
        };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});

    
    

    const applyCustomStyles = () => {
        const iframe = document.getElementById("kommunicate-widget-iframe");
        if (iframe) {
          iframe.style.height = "60%";

        }

      };
      
      
      const interval = setInterval(() => {
        const iframe = document.getElementById("kommunicate-widget-iframe");
        if (iframe) {
          applyCustomStyles();
          clearInterval(interval); 
        }
      }, 1000);
  
      return () => clearInterval(interval);
  }, []);

  return null; // No se necesita renderizar nada visual para el widget
}

export default ChatWidget;