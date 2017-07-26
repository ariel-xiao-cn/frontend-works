// jquery 订阅-发布 观察者模式
// 好处是 可以一处发布新事件， 其他所有订阅者都可以响应。
// 如 button1 发布 一个新的"theme-change", 并携带一些参数
// 任何监听"theme-change"的地方都可以立刻执行相应的处理事件


define(["jquery"], function($) {

	var o = $({});

    $.subscribe = function() {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function() {
        o.off.apply(o, arguments);
    };

    $.publish = function() {
        o.trigger.apply(o, arguments);
    };

    return $;
})