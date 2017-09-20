'use strict';

function _Audio(src, attrs) {
  var audio = null;

  if (typeof Audio === 'function') {
    audio = new Audio();
  } else {
    audio = document.createElement('audio');
  }

  if (src) {
    audio.src = src;
  }

  if (attrs) {
    Object.keys(attrs).map(function (attr) {
      audio[attr] = attrs[attr];
    });
  }

  return audio;
}

function addEvent(el) {
  for (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    res[_key - 1] = arguments[_key];
  }

  return el.addEventListener.apply(el, res);
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Bus = function () {
  function Bus() {
    classCallCheck(this, Bus);

    this._handlerMap = {};
    this._id = 0;
  }

  createClass(Bus, [{
    key: "on",
    value: function on(type, handler) {
      var _t = this;

      if (!(type in _t._handlerMap)) {
        _t._handlerMap[type] = {};
      }

      _t._handlerMap[type][++_t._id] = handler;

      return _t._id;
    }
  }, {
    key: "off",
    value: function off(type, id) {
      var _t = this;

      if (type in _t._handlerMap && id in _t._handlerMap[type]) {
        delete _t._handlerMap[type][id];
      }
    }
  }, {
    key: "fire",
    value: function fire(type) {
      var _t = this;

      if (type in _t._handlerMap) {
        var handlers = _t._handlerMap[type];

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var key in handlers) {
          handlers[key].apply(null, args);
        }
      }
    }
  }, {
    key: "once",
    value: function once(type, handler) {
      var _t = this;
      var id = _t.on(type, function (ret) {
        handler(ret);
        _t.off(type, id);
      });

      return id;
    }
  }]);
  return Bus;
}();

var classCallCheck$1 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var PlayerClass = function (_Bus) {
  inherits(PlayerClass, _Bus);

  function PlayerClass() {
    classCallCheck$1(this, PlayerClass);

    var _this = possibleConstructorReturn(this, (PlayerClass.__proto__ || Object.getPrototypeOf(PlayerClass)).call(this));

    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    _this._args = options;
    _this.isActivated = false;
    return _this;
  }

  createClass$1(PlayerClass, [{
    key: 'copy',
    value: function copy() {
      var _t = this;
      var _args = _t._args;

      var Constructor = _t.__proto__.constructor;

      return new (Function.prototype.bind.apply(Constructor, [null].concat(toConsumableArray(_args))))();
    }
  }, {
    key: 'play',
    value: function play() {
      this.fire('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.fire('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.fire('stop');
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.fire('reset');
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.fire('activate');
    }
  }]);
  return PlayerClass;
}(Bus);

var Player = function (_PlayerClass) {
  inherits(Player, _PlayerClass);

  function Player(options) {
    classCallCheck$1(this, Player);
    var src = options.src,
        _options$attrs = options.attrs,
        attrs = _options$attrs === undefined ? {} : _options$attrs,
        _options$eventList = options.eventList,
        eventList = _options$eventList === undefined ? [] : _options$eventList,
        _options$isActivated = options.isActivated,
        isActivated = _options$isActivated === undefined ? false : _options$isActivated;


    if (!src) {
      return possibleConstructorReturn(_this);
    }

    var _this = possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.config = {
      src: src, attrs: attrs, eventList: eventList,
      isActivated: isActivated
    };

    _this.audio = null;
    _this.isActivated = false;
    _init.call(_this);
    _bind.call(_this);
    return _this;
  }

  createClass$1(Player, [{
    key: 'addAudioEvent',
    value: function addAudioEvent(event) {
      var _t = this;
      var audio = _t.audio;

      var eventName = 'audio:' + event;

      if (typeof _t._handlerMap[eventName] !== 'undefined') {
        return;
      }

      addEvent(audio, event, function () {
        _t.fire(eventName);
      }, false);
    }
  }]);
  return Player;
}(PlayerClass);

function _init() {
  var _t = this;
  var _t$config = _t.config,
      src = _t$config.src,
      attrs = _t$config.attrs;

  var audio = _t.audio = new _Audio(src, attrs);
}

function _bind() {
  var _t = this;
  var audio = _t.audio,
      isActivated = _t.isActivated,
      config = _t.config;
  var eventList = config.eventList;


  var evList = [].concat(eventList, ['ended']);

  evList.map(function (ev) {
    _t.addAudioEvent(ev);
  });

  if (config.isActivated) {
    _t.once('play', function () {
      _t.activate();
    });
  }

  _t.on('play', function () {
    audio.play();
  });

  _t.on('pause', function () {
    audio.pause();
  });

  _t.on('stop', function () {
    audio.pause();
    audio.currentTime = 0;
  });

  _t.on('reset', function () {
    audio.currentTime = 0;
  });

  _t.on('audio:ended', function () {
    _t.fire('ended');
  });

  _t.on('activate', function () {
    if (!isActivated) {
      var currentTime = audio.currentTime;

      audio.play();
      audio.pause();
      audio.currentTime = currentTime;

      _t.isActivated = true;
    }
  });
}

var Mix = function (_PlayerClass) {
  inherits(Mix, _PlayerClass);

  function Mix(voice, bgm) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck$1(this, Mix);
    var _options$startWith = options.startWith,
        startWith = _options$startWith === undefined ? 'bgm' : _options$startWith,
        _options$endBy = options.endBy,
        endBy = _options$endBy === undefined ? 'voice' : _options$endBy,
        _options$isActivated = options.isActivated,
        isActivated = _options$isActivated === undefined ? false : _options$isActivated;


    if (!(voice && bgm)) {
      return possibleConstructorReturn(_this);
    }

    var _this = possibleConstructorReturn(this, (Mix.__proto__ || Object.getPrototypeOf(Mix)).call(this, voice, bgm, options));

    _this.config = {
      startWith: startWith, endBy: endBy,
      isActivated: isActivated
    };

    _this.voice = voice;
    _this.bgm = bgm;
    _this.players = [voice, bgm];
    _this.isActivated = voice.isActivated && bgm.isActivated;
    _init$1.call(_this);
    _bind$1.call(_this);
    return _this;
  }

  return Mix;
}(PlayerClass);

function _init$1() {
  var _t = this;
  var voice = _t.voice,
      bgm = _t.bgm;
}

function _bind$1() {
  var _t = this;
  var voice = _t.voice,
      bgm = _t.bgm,
      players = _t.players,
      config = _t.config;


  if (config.isActivated) {
    _t.once('play', function () {
      _t.activate();
    });
  }

  bgm.addAudioEvent('playing');

  bgm.on('audio:playing', function () {
    voice.play();
  });

  voice.on('ended', function () {
    bgm.stop();
  });

  _t.on('play', function () {
    bgm.play();
  });

  _t.on('pause', function () {
    players.map(function (p) {
      return p.pause();
    });
  });

  _t.on('stop', function () {
    players.map(function (p) {
      return p.stop();
    });
  });

  _t.on('reset', function () {
    players.map(function (p) {
      return p.reset();
    });
  });

  _t.on('activate', function () {
    players.map(function (p) {
      return p.activate();
    });
    _t.isActivated = true;
  });
}

var Join = function (_PlayerClass) {
  inherits(Join, _PlayerClass);

  function Join() {
    var _ref;

    classCallCheck$1(this, Join);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var len = args.length;
    var players = [];
    var config = {};

    var _this = possibleConstructorReturn(this, (_ref = Join.__proto__ || Object.getPrototypeOf(Join)).call.apply(_ref, [this].concat(args)));

    if (len < 2) {
      return possibleConstructorReturn(_this);
    } else {
      var last = args[len - 1];

      if (!(last instanceof PlayerClass)) {
        if (len === 2) {
          return possibleConstructorReturn(_this);
        }

        players = args.slice(0, -1);
        config = last;
      } else {
        players = args;
      }
    }

    _this.players = players;
    _this.config = config;

    _this.isActivated = [true].concat(players).reduce(function (a, b) {
      return a && b.isActivated;
    });
    _init$2.call(_this);
    _bind$2.call(_this);
    return _this;
  }

  return Join;
}(PlayerClass);

function _init$2() {
  var _t = this;
  var players = _t.players,
      config = _t.config;
}

function _bind$2() {
  var _t = this;
  var players = _t.players,
      config = _t.config,
      isActivated = _t.isActivated;

  var firstPlayer = players[0];
  var lastPlayer = players[players.length - 1];

  players.slice(0, -1).map(function (p, i) {
    p.on('ended', function () {
      players[i + 1].play();
    });
  });

  if (config.isActivated) {
    _t.once('play', function () {
      _t.activate();
    });
  }

  lastPlayer.on('ended', function () {
    _t.fire('ended');
  });

  _t.on('play', function () {
    firstPlayer.play();
  });

  _t.on('pause', function () {
    players.map(function (p) {
      return p.pause();
    });
  });

  _t.on('stop', function () {
    players.map(function (p) {
      return p.stop();
    });
  });

  _t.on('reset', function () {
    players.map(function (p) {
      return p.reset();
    });
  });

  _t.on('activate', function () {
    if (!isActivated) {
      players.map(function (p) {
        return p.activate();
      });
      _t.isActivated = true;
    }
  });
}

var index = {
  Player: Player,
  Mix: Mix, Join: Join
};

module.exports = index;
//# sourceMappingURL=index.cjs.js.map
