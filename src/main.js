"use strict";

dc.rangeslide = function (parent, chartGroup) {
    var RANGESLIDE_CLASS = "rangeslide";
    var _chart = dc.baseMixin({}),
        _container,
        _rangeslide,
        _animations = true,
        _autoPlay = false,
        _autoPlayDelay = 1000,
        _dataSource = "value",
        _enableLabelClick = true,
        _enableMarkerClick = true,
        _enableTrackClick = true,
        _endPosition = Infinity,
        _handlers = {},
        _highlightSelectedLabels = false,
        _labelsPosition = "below",
        _labelsWidth = 50,
        _labelsContent = "value",
        _leftLabel = false,
        _loop = false,
        _markerSize = 5,
        _margins = { top: 10, left: 25, bottom: 10, right: 25 },
        _mode = "single",
        _mouseWheel = false,
        _rightLabel = false,
        _showLabels = true,
        _showTrackMarkersProgress = false,
        _showTicks = true,
        _showTrackMarkers = false,
        _showTrackProgress = false,
        _showTooltips = false,
        _showValue = false,
        _sideLabelsWidth = 40,
        _slideMode = "snap",
        _startAlternateLabelsFromTop = false,
        _startPosition = 0,
        _spacing = "equidistant",
        _stepSize = 1,
        _thumbHeight = 16,
        _thumbWidth = 12,
        _tickHeight = 10,
        _trackHeight = 5,
        _tooltipsContent = "value",
        _valueIndicatorOffset = 5,
        _valueIndicatorWidth = 20,
        _valueIndicatorHeight = 15,
        _valueIndicatorPosition = "above",
        _valueIndicatorContent = "value";
    
    _chart._doRender = function () {       
        _chart.clear();
        _container = document.createElement("div");
        _container.classList.add(RANGESLIDE_CLASS);
        _chart.anchor().appendChild(_container);
        _chart.applyMargins();
        _rangeslide = rangeslide(_container, this.getOptions());
        
        return _chart;
    };
    
    _chart._doRedraw = function () {
        _rangeslide && _rangeslide.refresh();
        _chart.applyMargins();
        
        return _chart;
    };
    
    _chart.applyMargins = function() {
        _container.style.marginTop = _margins.top + "px";
        _container.style.marginLeft = _margins.left + "px";
        _container.style.marginBottom = _margins.bottom + "px";
        _container.style.marginRight = _margins.right + "px";
    };
    
    _chart.applyEventHandlers = function() {
        this.handlers({
            valueChanged: [ this.onValueChanged ],
            rangeChanged: [ this.onRangeChanged ],
            selectionChanged: [ this.onSelectionChanged ]
        });
    };
    
    _chart.getOptions = function () {
        return {
            animations: _animations,
            autoPlay: _autoPlay,
            autoPlayDelay: _autoPlayDelay,
            data: _chart.data(),
            dataSource: "key",
            enableLabelClick: _enableLabelClick,
            enableMarkerClick: _enableMarkerClick,
            enableTrackClick: _enableTrackClick,
            slideMode: _slideMode,
            handlers: _handlers,
            highlightSelectedLabels: _highlightSelectedLabels,
            labelsContent: _labelsContent,
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
            showTooltips: _showTooltips,
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
            valuePosition: _valueIndicatorPosition,
            valueIndicatorContent: _valueIndicatorContent
        };
    };

    _chart.clear = function() {
        var anchor = _chart.anchor();
        while (anchor.lastChild) {
            anchor.removeChild(anchor.lastChild);
        }
        _rangeslide && _rangeslide.destroy();
    };
    
    _chart.setValue = function (value) {
        _rangeslide.setValue(value);

        return _chart;
    };
    
    _chart.redrawOtherInGroup = function () {
        var charts = dc.chartRegistry.list(this.chartGroup());
        for (var i = 0; i < charts.length; ++i) {
            if (charts[i].chartID() === _chart.chartID()) continue;
            charts[i].redraw();
        }

        if (dc._renderlet !== null) {
            dc._renderlet(this.chartGroup());
        }
    };
    
    _chart.getValue = function() {
        return _rangeslide.getValue();
    };
    
    _chart.onValueChanged = function(item, element) {
        _chart.replaceFilter(item.key);
        _chart.redrawOtherInGroup();
    };
    
    _chart.onRangeChanged = function(range, element) {
        var low = range[0][_dataSource],
            high = range[1][_dataSource];
        
        // Increase high by small value to achieve "right-closed" range as dc.filters.RangedFilter is "right-open"
        high = Number.isFinite(high) ? high * 1.0001 : high;  
        _chart.replaceFilter(dc.filters.RangedFilter(low, high));
        _chart.redrawOtherInGroup();
    };
    
    _chart.onSelectionChanged = function(selections, element) {
        _chart.replaceFilter(selections);
        _chart.redrawOtherInGroup();
    };
    
    _chart.onSelectionChanged = function(range, element) {
        _chart.replaceFilter(dc.filters.RangedFilter(range[0], range[1]));
        _chart.redrawOtherInGroup();
    };
    
    _chart.animations = function(arg) {
        return (!arguments.length ? _animations: (_animations = arg, _chart));
    };
    
    _chart.autoPlay = function(arg) {
        return (!arguments.length ? _autoPlay : (_autoPlay = arg, _chart));
    };
    
    _chart.autoPlayDelay = function(arg) {
        return (!arguments.length ? _autoPlayDelay : (_autoPlayDelay = arg, _chart));
    };
    
    _chart.dataSource = function(arg) {
        return (!arguments.length ? _dataSource : (_dataSource = arg, _chart));
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
    
    _chart.slideMode = function(arg) {
        return (!arguments.length ? _slideMode : (_slideMode = arg, _chart));
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
    
    _chart.labelsContent = function(arg) {
        return (!arguments.length ? _labelsContent : (_labelsContent = arg, _chart));
    };
    
    _chart.leftLabel = function(arg) {
        return (!arguments.length ? _leftLabel : (_leftLabel = arg, _chart));
    };
    
    _chart.loop = function(arg) {
        return (!arguments.length ? _loop : (_loop = arg, _chart));
    };
    
    _chart.margins = function(arg) {
        return (!arguments.length ? _margins : (_margins = arg, _chart));
    };
    
    _chart.markerSize = function(arg) {
        return (!arguments.length ? _markerSize : (_markerSize = arg, _chart));
    };
    
    _chart.mode = function(arg) {
        return (!arguments.length ? _mode : (_mode = arg, _chart));
    };
    
    _chart.mouseWheel = function(arg) {
        return (!arguments.length ? _mmouseWheel : (_mouseWheel = arg, _chart));
    };
    
    _chart.rangeslide = function(arg) {
        return (!arguments.length ? _rangeslide: (_rangeslide = arg, _chart));
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
    
    _chart.showTooltips = function(arg) {
        return (!arguments.length ? _showTooltips : (_showTooltips = arg, _chart));
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
    
    _chart.spacing = function(arg) {
        return (!arguments.length ? _spacing : (_spacing = arg, _chart));
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
    
    _chart.tooltipsContent = function(arg) {
        return (!arguments.length ? _tooltipsContent : (_tooltipsContent = arg, _chart));
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
    
    _chart.valueIndicatorPosition = function(arg) {
        return (!arguments.length ? _valueIndicatorPosition : (_valueIndicatorPosition = arg, _chart));
    };
    
    _chart.valueIndicatorContent = function(arg) {
        return (!arguments.length ? _valueIndicatorContent : (_valueIndicatorContent = arg, _chart));
    };
    
    _chart.applyEventHandlers();
    
    return _chart.anchor(parent, chartGroup);
};

return dc.rangeslide;