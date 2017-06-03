<template lang="pug">
    div.ruler-wrap
        div.axis-x
        div.axis-y
        div.ruler__help(@click="help.show = !help.show") ?
        div.ruler__tooltip.ruler-util--hidden
        div.ruler__create(v-show="create.show")
            h5 Create a line
            .rc_form
                .input--field
                    label Horizontal
                        input(type="radio", name="asix", value="x", v-model="create.asix")
                .input--field
                    label Vertical
                        input(type="radio", name="asix", value="y", v-model="create.asix")
                .input--field
                    label Position
                        input(type="text", v-model.number="create.value")
            .ruler__create__buttons
                .rc_button(@click="createLine") submit
                .rc_button(@click="cancle") cancle
        div.ruler__info(v-show="info.show")
            ul
                li  X: {{mouse.pageX}}
                li  Y: {{mouse.pageY}}
                li clientX: {{mouse.clientX}}
                li clientY: {{mouse.clientY}}
                li scrollTop: {{scrollTop}}
                li W: {{window.width}}
                li H: {{window.height}}
        div.ruler__help__modal(v-show="help.show")
            h5 The keymaps
            table
                tr
                    th KEYMAP
                    th DESCRIPTION
                tr
                    td N
                    td Create a 
                        strong new
                        |  line
                tr
                    td I
                    td 
                        strong Info
                tr
                    td Delete
                    td 
                        strong Delete
                        |  the line which is mouseover
                tr
                    td H
                    td 
                        strong Hide
                        |  all lines
                tr
                    td C
                    td 
                        strong Clean
                        |  all lines

</template>

<style lang="less">
.ruler-user-select {
    user-select: none;
}
.ruler-wrap {
    ul, li {
        list-style: none;
    }
}
.ruler__help__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    padding: 15px;
    background: #282828;
    text-align: left;
    h5 {
        font-size: 18px;
        margin-top: 0;
        margin-bottom: 15px;
    }
    table {
        width: 100%;
        font-size: 14px;
        td {
            padding: 10px 5px;
            vertical-align: top;
            strong {
                font-weight: bold;
                font-style: italic;
            }
        }
    }
}
.ruler__help {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: #282828;
    color: #fff;
    font-size: 28px;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background: #555;
    }
    &:active {
        background: #333;
    }
}
.ruler-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 10001;
    color: #fff;
    font: 12px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace, "PingFang SC", sans-serif;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    &,
    & > * {
        box-sizing: content-box;
    }
}
.rc_form {
    margin-bottom: 15px;
}
.input--field {
    margin-bottom: 12px;
    input {
        margin-left: 10px;
        vertical-align: middle;
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
    }
    input[type=text] {
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);
        transition: border linear .2s,box-shadow linear .2s;
        display: inline-block;
        height: 20px;
        padding: 4px 6px;
        font-size: 14px;
        line-height: 20px;
        color: #555;
        vertical-align: middle;
        border-radius: 4px;
        width: 96px;
        &:focus {
            border-color: rgba(82,168,236,0.8);
            outline: 0; 
            box-shadow: inset 0 1px 1px rgba(0,0,0,0.075), 0 0 8px rgba(82,168,236,0.6);
        }
    }
}
.ruler__create__buttons {
    text-align: center;
    .rc_button {
        display: inline-block;
        padding: 2px 10px;
        margin-bottom: 0;
        font-size: 11.9px;
        line-height: 20px;
        color: #333;
        text-align: center;
        text-shadow: 0 1px 1px rgba(255,255,255,0.75);
        vertical-align: middle;
        cursor: pointer;
        background-color: #f5f5f5;
        padding: 0 10px;
        background-image: linear-gradient(to bottom,#fff,#e6e6e6);
        background-repeat: repeat-x;
        border: 1px solid #ccc;
        border-radius: 4px;
        &:first-child {
            margin-right: 12px;
        }
    }
}
.ruler__create {
    position: absolute;
    width: 240px;
    padding: 12px;
    background-color: #282828;
    text-align: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h5 {
        font-size: 16px;
        margin-top: 0;
        margin-bottom: 12px;
    }
}
.ruler__tooltip {
    position: absolute;
    color: #fff;
    background-color: #282828;
    border-radius: 2px;
    padding: 2px 4px;
    box-shadow: 1px 1px 3px 1px rgba(40, 40, 40, .5);
}
.axis-x,
.axis-y {
    position: absolute;
    left: 0;
    top: 0;
}
.axis-x {
    width: 100%;
    height: 20px;
    border-bottom: 1px solid #fff;
}
.axis-y {
    width: 20px;
    height: 100%;
    border-right: 1px solid #fff;
}
.axis-x__hundred,
.axis-x__twenty,
.axis-x__ten {
    position: absolute;
    bottom: 0;
    padding-left: 2px;
    border-left: 1px solid #fff;
}
.axis-y__hundred,
.axis-y__twenty,
.axis-y__ten {
    position: absolute;
    right: 0;
    padding-left: 2px;
    border-top: 1px solid #fff;
    span {
        position: absolute;
        left: 2px;
        top: 0;
        width: 1em;
        word-break: break-all;
        line-height: 1;
    }
}

.axis-x__hundred {
    height: 100%;
}

.axis-x__twenty {
    height: 8px;
}

.axis-x__ten {
    height: 4px;
}
.axis-y__hundred {
    width: 100%;
}
.axis-y__twenty {
    width: 8px;
}

.axis-y__ten {
    width: 4px;
}
.ruler__line {
    position: absolute;
    background-color: #4affff;
    box-sizing: border-box;
    &.active {
        background-color: #E74C3C;
    }
    &:before {
        position: absolute;
        content: '';
        width: 24px;
        height: 24px;
        background: url('data:image/png;base64,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') no-repeat;
        background-size: 100%;
    }
}
.ruler__line--x {
    height: 3px;
    width: 100%;
    left: 0;
    margin-top: -1px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    background-clip: content-box;
    cursor: row-resize;
    padding: 0 24px 0 20px;
    &:before {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
.ruler__line--y {
    width: 3px;
    height: 100%;
    top: 0;
    margin-left: -1px;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    background-clip: content-box;
    cursor: col-resize;
    padding: 20px 0 24px 0;
    &:before {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) rotate(-90deg);
    }
}
.ruler-util--hidden {
    visibility: hidden;
}
.ruler__info {
    position: absolute;
    right: 0;
    top: 20%;
    width: 150px;
    padding: 0 12px;
    text-align: left;
    background-color: #282828;
    li {
        margin: 10px 0;
    }
}
.ruler-distance {
    position: absolute;
    background-color: #E74C3C;
    span {
        position: absolute;
    }
}
.ruler-distance--y {
    width: 1px;
    left: 50%;
    transform: translateX(-50%);
    span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5px;
    }
}
.ruler-distance--x {
    height: 1px;
    top: 50%;
    transform: translateY(-50%);
    span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 5px;
    }
}
</style>

<script>
var $ = require('./jquery-3.2.1.min')
var _ = require('lodash')
function createScale (orientation) {
    orientation = orientation || 'x'
    var total = orientation === 'x' ? $(window).width() : $(window).height()
    var prex = 'axis-' + orientation
    var $ele = $('.' + prex)
    $ele.children().remove()
    var css = {}
    for (var i = 0; i < parseInt(total / 100, 10); i++) {
        css[orientation==='x' ? 'left' : 'top'] = i * 100 + 'px'
        var span = $('<span>').text(i * 100)
        var hundred = $('<div>').addClass(prex + '__hundred')
            .css(css)
            .append(span)
        $ele.append(hundred)
    }
    for (var i = 0; i < parseInt(total / 20, 10); i++) {
        if (i % 100 !== 0) {
            css[orientation==='x' ? 'left' : 'top'] = i * 20 + 'px'
            var twenty = $('<div>').addClass(prex + '__twenty')
                .css(css)
            $ele.append(twenty)
        }
    }
    for (var i = 0; i < parseInt(total / 10, 10); i++) {
        if (i % 100 !== 0 && i % 20 !== 0) {
            css[orientation==='x' ? 'left' : 'top'] = i * 10 + 'px'
            var ten = $('<div>').addClass(prex + '__ten')
                .css(css)
            $ele.append(ten)
        }
    }
}
module.exports = {
    data: function () {
        return {
            mouse: {},
            scrollTop: 0,
            window: {},
            info: {
                show: false
            },
            create: {
                show: false,
                asix: 'x',
                value: 100
            },
            help: {
                show: false
            }
        }
    },
    watch: {
        'create.value': _.debounce(function (val) {
            var max = this.create.asix === 'x' ? this.window.width : this.window.height
            if (val < $('.axis-x').position().top + $('.axis-x').height() + 1) {
                this.create.value = $('.axis-x').position().top + $('.axis-x').height() + 1
            } else if (val > max - 1) {
                this.create.value = max - 1
            }
        }, 500)
    },
    mounted: function () {
        this.createRules();
        $(window).on('resize', _.debounce(this.createRules));
        var $tooltip = $('.ruler__tooltip')
        $(window).on('scroll', (e) => {
            this.scrollTop = $(window).scrollTop();
        })
        // create line 
        
        var lineX
        var lineY
        var drag
        var dragY
        $('.axis-x').on('mousedown', (e) => {
            drag = true
        })
        $('.axis-y').on('mousedown', (e) => {
            dragY = true
        })
        var rulerX_height = $('.axis-x').position().top + $('.axis-x').height()
        var rulerY_width = $('.axis-y').position().left + $('.axis-y').width()
        $(document).on('mousemove', (e) => {
            this.mouse = e;
            if (drag) {
                if (lineX && lineX.length > 0) {
                    lineX.css({
                        top: e.clientY
                    })
                    if (e.clientY < rulerX_height) {
                        lineX.addClass('ruler-util--hidden')
                        $tooltip.addClass('ruler-util--hidden')
                    } else {
                        lineX.removeClass('ruler-util--hidden')
                        $tooltip.removeClass('ruler-util--hidden')
                            .css({
                                top: e.clientY - 20 - $tooltip.height(),
                                left: e.clientX + 20
                            })
                            .text('Y: ' + e.clientY + ' px')
                    }
                } else {
                    if (e.clientY > rulerX_height) {
                        lineX = $('<div class="ruler__line ruler__line--x"></div>')
                        lineX.css({
                            top: e.clientY
                        })
                        $('.ruler-wrap').append(lineX)
                    }
                }
                
            }
            if (dragY) {
                if (lineY && lineY.length > 0) {
                    lineY.css({
                        left: e.clientX
                    })
                    if (e.clientX < rulerY_width) {
                        lineY.addClass('ruler-util--hidden')
                        $tooltip.addClass('ruler-util--hidden')
                    } else {
                        lineY.removeClass('ruler-util--hidden')
                        $tooltip.removeClass('ruler-util--hidden')
                            .css({
                                top: e.clientY - 20 - $tooltip.height(),
                                left: e.clientX + 20
                            })
                            .text('X: ' + e.clientX + ' px')
                    }
                } else {
                    if (e.clientX > rulerY_width) {
                        lineY = $('<div class="ruler__line ruler__line--y"></div>')
                        lineY.css({
                            left: e.clientX
                        })
                        $('.ruler-wrap').append(lineY)
                    }
                }
            }
        })
        $(document).on('mouseup', (e) => {
            drag = false
            dragY = false
            if (lineX && e.clientY < rulerX_height) {
                lineX.remove()
            }
            if (lineY && e.clientX < rulerY_width) {
                lineY.remove()
            }
            lineX = null
            lineY = null
            $tooltip.addClass('ruler-util--hidden')
        })
        // drag line
        $(document).on('mousedown', '.ruler__line--x', function (e) {
            lineX = $(this)
            drag = true
        })
        $(document).on('mousedown', '.ruler__line--y', function (e) {
            lineY = $(this)
            dragY = true
        })
        var startCoordinate
        var endCoordinate
        $(document).on('mousedown', '.ruler__line', function (e) {
            $('.ruler__line').removeClass('active')
            startCoordinate = {
                x: e.pageX,
                y: e.pageY
            }
        })
        $(document).on('mouseup', '.ruler__line', function (e) {
            endCoordinate = {
                x: e.pageX,
                y: e.pageY
            }
        })
        function distance (a, b) {
            return a.x - b.x === 0 && a.y - b.y === 0
        }
        // click
        function createDistance (direction, distance, start) {
            $('.ruler-distance').remove()
            var directionClass = direction === 'x' ? 'ruler-distance--x' : 'ruler-distance--y'
            var css = {}
            if (direction === 'x') {
                css.width = distance + 'px'
                css.left = start + 'px'
            } else {
                css.height = distance + 'px'
                css.top = start + 'px'
            }
            var ele = $('<div>').addClass('ruler-distance')
                .addClass(directionClass)
                .html('<span>' + distance + 'px' + '</span>')
                .css(css)
            $('.ruler-wrap').append(ele);
        }
        $(document).on('click', '.ruler__line', function (e) {
            if (distance(startCoordinate, endCoordinate)) {
                e.stopPropagation();
                $('.ruler__line').removeClass('active')
                $(this).addClass('active')
            }
        })
        $(document).on('click', function (e) {
            $('.ruler__line').removeClass('active')
        })
        var active
        $(document).on('mouseover', '.ruler__line--x, .ruler__line--y', function (e) {
            active = $(this);
            if (drag || dragY) {
                return;
            }
            var target = $('.ruler__line.active')
            var direction = $(this).hasClass('ruler__line--x') ? 'y' : 'x'
            if (target.length > 0) {
                var asix = direction === 'x' ? 'left' : 'top'
                var distance = parseInt(target.css(asix), 10) - parseInt($(this).css(asix), 10)
                var start
                if (distance > 0) {
                    start = parseInt($(this).css(asix), 10)
                } else {
                    start = parseInt(target.css(asix), 10)
                }
                createDistance(direction, Math.abs(distance), start)
            }
        })
        $(document).on('mouseout', '.ruler__line--x, .ruler__line--y', function (e) {
            $('.ruler-distance').remove()
            active = null;
        })
        $(document).on('keyup', (e) => {
            if (e.which === 78) {
                this.create.show = true
            } else if (e.which === 27) {
                this.create.show = false
            }
            if (e.which === 73) {
                this.info.show = !this.info.show;
            }
            if (e.which === 8 && active) {
                active.remove()
            }
            if (e.which === 72) {
                $('.ruler__line').toggleClass('ruler-util--hidden')
            }
            if (e.which === 67) {
                $('.ruler__line').remove()
            }
        })
    },
    methods: {
        createRules: function () {
            createScale()
            createScale('y')
            this.window = {
                width: $(window).width(),
                height: $(window).height(),
            }
        },
        cancle: function () {
            this.create.show = false;
        },
        createLine: function () {
            var css = {};
            css[this.create.asix === 'x'?'top':'left'] = this.create.value
            var line = $('<div class="ruler__line">').addClass('ruler__line--' + this.create.asix)
                .css(css)
            $('.ruler-wrap').append(line)
            this.cancle();
        }
    }
}
</script>