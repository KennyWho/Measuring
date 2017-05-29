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
                        |  all line
                tr
                    td C
                    td 
                        strong Clean
                        |  all line

</template>

<style lang="less">
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
}
.ruler__line--x {
    height: 1px;
    width: 100%;
    left: 0;
    margin-top: -1px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    background-clip: content-box;
    cursor: row-resize;
}
.ruler__line--y {
    width: 1px;
    height: 100%;
    top: 0;
    margin-left: -1px;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    background-clip: content-box;
    cursor: col-resize;
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
        var active
        $(document).on('mouseover', '.ruler__line--x, .ruler__line--y', function (e) {
            active = $(this);
        })
        $(document).on('mouseout', '.ruler__line--x, .ruler__line--y', function (e) {
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