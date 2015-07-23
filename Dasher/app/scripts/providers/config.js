angular
	.module('btConfig', [])
	.provider('config', function configProvider() {
        var config = {
      "api_uri": "http://192.168.1.3:8080",
      "knob_options": {
        "displayInput": false,
        "readOnly": true
      },
      "default_organization_logo": "img/default-thumb.jpg",
      "challenges_types": {
        "go-no-go": "Go / No Go",
        "multi-tasking": "Multitasking",
        "multiple-choice-confirm": "Multiple Choice + Confirm",
        "multiple-choice-rating": "Multiple Choice or Rating",
        "multiple-choice-stimulus": "Multiple Choice + Stimulus",
        "sliders": "Sliders",
        "swipe-left-right": "Swipe Left Right",
        "type-in": "Text Input Response",
        "video-interview": "Video Interview",
        "audio-interview": "Audio Interview",
        "all": "All"
      },
      "domains": {
        "think": "Think",
        "engage": "Engage",
        "interact": "Interact"
      },
      "max_chars": 100,
      "color_scale": [
        "red",
        "#f6df00",
        "green"
      ],
      "facebook": {}
    }

        this.$get = function () {
			var host = window.location.host;
            var isLocal = host.indexOf("127.0.0.1") >= 0 || host.indexOf("localhost") >= 0;

            if (isLocal) {
                config.api_uri = "http://192.168.1.3:8080";
            }
            return config;
        }
	});