<template>
  <iframe
    width="100%"
    height="390px"
    src="https://www.heibaizhibo.com/play-iframe/1315305#1099566"
    id="iframe"
  />
  <!-- <div>
    <object :data="src" width="600" height="400">
    <embed :src="src" width="600" height="400"> </embed>
    Error: Embedded data could not be displayed.
</object>
  </div> -->
</template>

<script>
export default {
  name: "player",
  props: {
    // src: {
    //   required: true,
    //   default: ""
    // }
  },
  computed: {
    src() {
      return "https://www.heibaizhibo.com/play-iframe/1315305#1099566";
    }
  },
  watch: {
    src1() {
      // function setUserAgent(window, userAgent) {
      //   if (window.navigator.userAgent != userAgent) {
      //     var userAgentProp = {
      //       get: function() {
      //         return userAgent;
      //       }
      //     };
      //     try {
      //       Object.defineProperty(window.navigator, "userAgent", userAgentProp);
      //     } catch (e) {
      //       window.navigator = Object.create(navigator, {
      //         userAgent: userAgentProp
      //       });
      //     }
      //   }
      // }
      console.log(document.querySelector(".my-frame"));
      function setUserAgent(window, userAgent) {
        // Works on Firefox, Chrome, Opera and IE9+
        if (navigator.__defineGetter__) {
          navigator.__defineGetter__("userAgent", function() {
            return userAgent;
          });
        } else if (Object.defineProperty) {
          Object.defineProperty(navigator, "userAgent", {
            get: function() {
              return userAgent;
            }
          });
        }
        // Works on Safari
        if (window.navigator.userAgent !== userAgent) {
          var userAgentProp = {
            get: function() {
              return userAgent;
            }
          };
          try {
            Object.defineProperty(window.navigator, "userAgent", userAgentProp);
          } catch (e) {
            window.navigator = Object.create(navigator, {
              userAgent: userAgentProp
            });
          }
        }
      }
      setUserAgent(window, "macOS");

      // setUserAgent(document.querySelector(".my-frame").contentWindow, "macOS");
    }
  },
  mounted() {
    function setUserAgent(window, userAgent) {
      if (window.navigator.userAgent != userAgent) {
        var userAgentProp = {
          get: function() {
            return userAgent;
          }
        };

        try {
          Object.defineProperty(window.navigator, "userAgent", userAgentProp);
        } catch (e) {
          window.navigator = Object.create(navigator, {
            userAgent: userAgentProp
          });
        }
      }
    }

    setUserAgent(
      document.querySelector("#iframe").contentWindow,
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
    );
  }
};
</script>

<style></style>
