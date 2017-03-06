'use strict';

Polymer({
  is: 'tsante-mqtt-publisher',

  properties: {
    /**
     * the topic to publish in
     * @type {String}
     */
    topic: {
      type: String
    },
    /**
     * qos
     *
     * the value of the qos could be 0, 1, 2
     * @type {Number}
     */
    qos: {
      type: Number,
      value: 0
    },
    /**
     * retain flag
     * @type {Boolean}
     */
    retained: {
      type: Boolean,
      value: false
    },
    /**
     * the payload to send
     * @type {String}
     */
    payload: {
      type: String,
      value: "",
      observer: 'publish'
    }
  },

  attached: function attached() {
    var _this = this;

    if (this.parentElement.tagName !== 'tsante-mqtt'.toUpperCase()) {
      console.error('tsante-mqtt-publisher must have a tsante-mqtt parent');
    }
    this.parentElement.addEventListener('tsante-mqtt-connect', function (evt) {
      if (evt.detail.status && _this.payload) {
        _this._publish();
      }
    });
  },

  /**
   * publish to the server
   *
   * @method publish
   * @param  {String} payload the value to publish
   * @param  {Number} qos the qos of the message (0,1,2) by default this.qos
   * @param  {Boolean} retained flag indicates that the server must or not keep the value by default this.retained
   */
  publish: function publish(payload, qos, retained) {
    if (this.parentElement.connected) {
      payload = typeof payload === "string" ? payload : this.payload;
      qos = !qos || isNaN(qos) ? this.qos : qos;
      retained = typeof retained === 'boolean' ? retained : this.retained;
      this.parentElement.client.send(this.topic, payload, qos, retained);
    }
  }
});
