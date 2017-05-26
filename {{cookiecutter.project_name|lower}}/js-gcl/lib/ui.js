export class CustomEvent {
	/**
	 * @param {!string} type
	 * @param {(EventTarget|EventComponent)} target
	 */
	constructor(type, target) {
		/**
		 * @public
		 * @type {!string}
		 */
		this.type = type;
		/**
		 * @public
		 * @type {(EventTarget|EventComponent)}
		 */
		this.target = target;
		/**
		 * @public
		 * @type {!boolean}
		 */
		this.defaultPrevented = false;
	}

	preventDefault() {
		this.defaultPrevented = true;
	}
}


export class EventComponent {
	constructor() {
		/**
		 * @private
		 * @type {!Map<string, Array<function((Event|CustomEvent))>>}
		 */
		this.listeners_ = new Map();
	}

	addEventListener(type, listener) {
		let stack = this.listeners_.get(type);
		if (!stack) {
			stack = [];
			this.listeners_.set(type, stack);
		}
		stack.push(listener);
	}

	removeEventListener(type, listener) {
		let stack = this.listeners_.get(type);
		if (!stack) { return; }
		const length = stack.length;
		for (let i = 0; i < length; ++i) {
			if (stack[i] === listener) {
				stack.splice(i, 1);
				this.removeEventListener(type, listener);
				return;
			}
		}
	}

	/**
	 * @param {!(Event|CustomEvent)} event
	 */
	dispatchEvent(event) {
		let type = event.type;
		let stack = this.listeners_.get(type);
		if (!stack) { return true; }
		let canceled = false;
		for (let handler of stack) {
			handler.call(this, event);
			canceled = canceled || event.defaultPrevented;
		}
		return !canceled;
	}
}


export class SampleForm extends EventComponent {
	constructor() {
		super();
		/** @type {Element} */
		this.$element;
		/** @type {Element} */
		this.$messageInput_;
	}

	/** @param {Element} $element */
	decorate($element) {
		this.decorateInternal($element);
		this.enterDocument();
	}

	/** @param {Element} $element */
	decorateInternal($element) {
		this.$element = $element;

		function findElement(className) {
			return $element.getElementsByClassName(className)[0];
		}

		this.$messageInput_ = findElement(SampleForm.CSS_CLASSES.MESSAGE_INPUT);
	}

	enterDocument() {
		this.$element.addEventListener('submit', (event) => {
			this.dispatchEvent(event);
			event.preventDefault();
		});
	}

	/* Properties */

	get message() {
		return this.$messageInput_.value;
	}
}

/** @enum {string} */
SampleForm.CSS_CLASSES = {
	MESSAGE_INPUT: 'message-input',
	SUBMIT_BUTTON: 'submit-button',
};


export class Message {
	/** @param {string} message */
	constructor(message) {
		this.message = message;
	}
	/** @param {Element} $parent */
	render($parent) {
		const $element = document.createElement('div');
		$element.classList.add('result-message');
		$element.classList.add('card');
		$element.innerHTML = this.message;
		$parent.appendChild($element);
	}
}
