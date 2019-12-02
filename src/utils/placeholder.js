export default () => {
	const { $ } = window;
	if (!$) return;
	$(() => {
		// 判断浏览器是否支持placeholder属性
		const supportPlaceholder = 'placeholder' in document.createElement('input');
		const placeholder = (input) => {
			let text = '';
			text = input.attr('placeholder');
			const { defaultValue } = input;
			if (!defaultValue) {
				console.log(text);
				input.val(text).addClass('yc-input-placeholder');
			}
			input.focus(function fun() {
				console.log(text, input.val());
				if (input.val() === text) {
					$(this).val('');
				}
			});
			input.blur(function fun() {
				if (input.val() === '') {
					$(this).val(text).addClass('yc-input-placeholder');
				}
			});
			// 输入的字符不为灰色
			input.keydown(function fun() {
				$(this).removeClass('yc-input-placeholder');
			});
		};
		// 当浏览器不支持placeholder属性时，调用placeholder函数
		if (!supportPlaceholder) {
			$('input').each(function fun() {
				placeholder($(this));
			});
		}
	});
};
