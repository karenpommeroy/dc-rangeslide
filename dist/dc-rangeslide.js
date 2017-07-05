(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["dc","rangeslide"], function (a0,b1) {
      return (factory(a0,b1));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("dc"),require("rangeslide"));
  } else {
    factory(root["dc"],root["rangeslide"]);
  }
}(this, function (dc, rangeslide) {

"use strict";

var data1 = [
    { name: "2016", item: "This is some sample text associated with first item." },
    { name: "2017", item: "This is some sample text associated with second item." },
    { name: "2018", item: "This is some sample text associated with third item. It was returned from a function." },
    { name: "2019", item: function() { return "This is some sample text associated with fourth item. It was also returned from a function."; } },
    { name: "2020", item: "This is some sample text associated with fifth item." },
    { name: "2021", item: "This is some sample text associated with sixth item." },
    { name: "2022", item: "This is some sample text associated with the last item." }
];

dc.rangeslide = function (parent, chartGroup) {
    var RANGESLIDE_CLASS = "rangeslide";
    var _chart = dc.baseMixin({}),
        _rangeslide,
        _autoPlay = false,
        _autoPlayDelay = 1000,
        _enableLabelClick = true,
        _enableMarkerClick = true,
        _enableTrackClick = true,
        _handlers = {},
        _highlightSelectedLabels = false,
        _labelsPosition = "below",
        _labelsWidth = 50,
        _leftLabel = false,
        _loop = false,
        _markerSize = 5,
        _mode = "single",
        _rightLabel = false,
        _showLabels = true,
        _showTrackMarkersProgress = false,
        _showTicks = true,
        _showTrackMarkers = false,
        _showTrackProgress = false,
        _showValue = false,
        _sideLabelsWidth = 40,
        _startAlternateLabelsFromTop = false,
        _startPosition = 0,
        _endPosition = Infinity,
        _stepSize = 1,
        _thumbHeight = 10,
        _thumbWidth = 5,
        _tickHeight = 5,
        _trackHeight = 5,
        _valueIndicatorOffset = 5,
        _valueIndicatorWidth = 20,
        _valueIndicatorHeight = 15,
        _valuePosition = "above",
        _valueSource = "name";
    
    _chart._doRender = function () {
        _chart.clear();
        _chart.anchor().classList.add(RANGESLIDE_CLASS);
        _rangeslide = rangeslide(_chart.anchor(), {
            data: data1,
            showLabels: true,
            showTicks: true,
            thumbWidth: 15,
            thumbHeight: 20,
            handlers: {
                "initialized": [],
                "labelClicked": [],
                "markerClicked": [],
                "trackClicked": [],
                "playStop": [],
                "playStart": [],
                "thumbDragStart": [],
                "thumbDragEnd": [],
                "valueChanged": []
            }
        });
        
        return _chart;
    };
    
    _chart._doRedraw = function () {
        return _chart._doRender();
    };

    _chart.getOptions = function () {
        return {
            autoPlay: _autoPlay,
            autoPlayDelay: _autoPlayDelay,
            enableLabelClick: _enableLabelClick,
            enableMarkerClick: _enableMarkerClick,
            enableTrackClick: _enableTrackClick,
            handlers: _handlers,
            highlightSelectedLabels: _highlightSelectedLabels,
            labelsPosition: _labelsPosition,
            labelsWidth: _labelsWidth,
            leftLabel: _leftLabel,
            loop: _loop,
            markerSize: _markerSize,
            mode: _mode,
            rightLabel: _rightLabel,
            showLabels: _showLabels,
            showTrackMarkersProgress: _showTrackMarkersProgress,
            showTicks: _showTicks,
            showTrackMarkers: _showTrackMarkers,
            showTrackProgress: _showTrackProgress,
            showValue: _showValue,
            sideLabelsWidth: _sideLabelsWidth,
            startAlternateLabelsFromTop: _startAlternateLabelsFromTop,
            startPosition: _startPosition,
            endPosition: _endPosition,
            stepSize: _stepSize,
            thumbHeight: _thumbHeight,
            thumbWidth: _thumbWidth,
            tickHeight: _tickHeight,
            trackHeight: _trackHeight,
            valueIndicatorOffset: _valueIndicatorOffset,
            valueIndicatorWidth: _valueIndicatorWidth,
            valueIndicatorHeight: _valueIndicatorHeight,
            valuePosition: _valuePosition,
            valueSource: _valueSource
        };
    };

    _chart.clear = function() {
        var anchor = _chart.anchor();
        while (anchor.lastChild) {
            anchor.removeChild(anchor.lastChild);
        }
    };
    
    _chart.getValue = function() {
        return _rangeslide.getValue();
    };
    
    _chart.autoPlay = function(arg) {
        return (!arguments.length ? _autoPlay : (_autoPlay = arg, _chart));
    };
    
    _chart.autoPlayDelay = function(arg) {
        return (!arguments.length ? _autoPlayDelay : (_autoPlayDelay = arg, _chart));
    };
    
    _chart.enableLabelClick = function(arg) {
        return (!arguments.length ? _enableLabelClick : (_enableLabelClick = arg, _chart));
    };
    
    _chart.enableMarkerClick = function(arg) {
        return (!arguments.length ? _enableMarkerClick : (_enableMarkerClick = arg, _chart));
    };
    
    _chart.enableTrackClick = function(arg) {
        return (!arguments.length ? _enableTrackClick : (_enableTrackClick = arg, _chart));
    };
    
    _chart.handlers = function(arg) {
        return (!arguments.length ? _handlers : (_handlers = arg, _chart));
    };
    
    _chart.highlightSelectedLabels = function(arg) {
        return (!arguments.length ? _highlightSelectedLabels : (_highlightSelectedLabels = arg, _chart));
    };
    
    _chart.labelsPosition = function(arg) {
        return (!arguments.length ? _labelsPosition : (_labelsPosition = arg, _chart));
    };
    
    _chart.labelsWidth = function(arg) {
        return (!arguments.length ? _labelsWidth : (_labelsWidth= arg, _chart));
    };
    
    _chart.leftLabel = function(arg) {
        return (!arguments.length ? _leftLabel : (_leftLabel = arg, _chart));
    };
    
    _chart.loop = function(arg) {
        return (!arguments.length ? _loop : (_loop = arg, _chart));
    };
    
    _chart.markerSize = function(arg) {
        return (!arguments.length ? _markerSize : (_markerSize = arg, _chart));
    };
    
    _chart.mode = function(arg) {
        return (!arguments.length ? _mode : (_mode = arg, _chart));
    };
    
    _chart.rightLabel = function(arg) {
        return (!arguments.length ? _rightLabel : (_rightLabel = arg, _chart));
    };
    
    _chart.showLabels = function(arg) {
        return (!arguments.length ? _showLabels : (_showLabels = arg, _chart));
    };
    
    _chart.showTrackMarkersProgress = function(arg) {
        return (!arguments.length ? _showTrackMarkersProgress : (_showTrackMarkersProgress = arg, _chart));
    };
    
    _chart.showTicks = function(arg) {
        return (!arguments.length ? _showTicks : (_showTicks = arg, _chart));
    };
    
    _chart.showTrackMarkers = function(arg) {
        return (!arguments.length ? _showTrackMarkers : (_showTrackMarkers = arg, _chart));
    };
    
    _chart.showTrackProgress = function(arg) {
        return (!arguments.length ? _showTrackProgress : (_showTrackProgress = arg, _chart));
    };
    
    _chart.showValue = function(arg) {
        return (!arguments.length ? _showValue : (_showValue = arg, _chart));
    };
    
    _chart.sideLabelsWidth = function(arg) {
        return (!arguments.length ? _sideLabelsWidth : (_sideLabelsWidth = arg, _chart));
    };
    
    _chart.startAlternateLabelsFromTop = function(arg) {
        return (!arguments.length ? _startAlternateLabelsFromTop : (_startAlternateLabelsFromTop = arg, _chart));
    };
    
    _chart.startPosition = function(arg) {
        return (!arguments.length ? _startPosition : (_startPosition = arg, _chart));
    };
    
    _chart.endPosition = function(arg) {
        return (!arguments.length ? _endPosition : (_endPosition = arg, _chart));
    };
    
    _chart.stepSize = function(arg) {
        return (!arguments.length ? _stepSize : (_stepSize = arg, _chart));
    };
    
    _chart.thumbHeight = function(arg) {
        return (!arguments.length ? _thumbHeight : (_thumbHeight = arg, _chart));
    };
    
    _chart.thumbWidth = function(arg) {
        return (!arguments.length ? _thumbWidth : (_thumbWidth = arg, _chart));
    };
    
    _chart.tickHeight = function(arg) {
        return (!arguments.length ? _tickHeight : (_tickHeight = arg, _chart));
    };
    
    _chart.trackHeight = function(arg) {
        return (!arguments.length ? _trackHeight : (_trackHeight = arg, _chart));
    };
    
    _chart.valueIndicatorOffset = function(arg) {
        return (!arguments.length ? _valueIndicatorOffset : (_valueIndicatorOffset = arg, _chart));
    };
    
    _chart.valueIndicatorWidth = function(arg) {
        return (!arguments.length ? _valueIndicatorWidth : (_valueIndicatorWidth = arg, _chart));
    };
    
    _chart.valueIndicatorHeight = function(arg) {
        return (!arguments.length ? _valueIndicatorHeight : (_valueIndicatorHeight = arg, _chart));
    };
    
    _chart.valuePosition = function(arg) {
        return (!arguments.length ? _valuePosition : (_valuePosition = arg, _chart));
    };
    
    _chart.valueSource = function(arg) {
        return (!arguments.length ? _valueSource : (_valueSource = arg, _chart));
    };
    
    return _chart.anchor(parent, chartGroup);
};

return dc.rangeslide;

}));
