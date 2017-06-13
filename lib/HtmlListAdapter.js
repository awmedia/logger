import * as consts from './consts'

const typeToColorMapping = {
    [consts.EMERGENCY]: '#F40404',
    [consts.ALERT]: '#F42C04',
    [consts.CRITICAL]: '#F42C04',
    [consts.ERROR]: '#F42C04',
    [consts.WARNING]: '#F46804',
    [consts.NOTICE]: '#F4A404',
    [consts.INFO]: '#0440F4',
    [consts.DEBUG]: '#212121'
};

/**
 * HtmlListAdapter
 */
export default class HtmlListAdapter {
    /**
     * @param   config.targetElement    Null to use document.body, an element or an element selector
     * @param   config.listType         "ol" or "ul" (default)
     * @param   config.listClassName
     * @param   config.listItemClassName
     * @param   config.isColorModeEnabled
     */
    constructor({targetElement, listType = 'ul', listClassName = '', listItemClassName = '', isColorModeEnabled = true } = config) {
        this._targetElement = targetElement;
        this._listType = listType;
        this._listClassName = listClassName;
        this._listItemClassName = listItemClassName;
        this._isColorModeEnabled = isColorModeEnabled;

        this._isListInitialized = false;
        this._listElement = null;

        this._isReady = new Promise((resolve) => {
            this._isReadyResolver = resolve;
        });

        document.addEventListener('DOMContentLoaded', this._isReadyResolver);
        window.addEventListener('load', this._isReadyResolver);

        if (document.readyState === 'complete') {
            this._isReadyResolver();
        }
    }

    /**
     * Public methods
     */

    log(type, log) {
        this._isReady.then(() => {
            if (!this._isListInitialized) {
                this._initList();
            }

            if (this._listElement) {
                this._listElement.appendChild(this._createAndGetNewListItem(type, log));
            }
        });
    }

    /**
     * Protected methods
     */

    _initList() {
        if (!this._isListInitialized) {
            this._isListInitialized = true;

            if(typeof this._targetElement == 'string') {
                this._targetElement = document.querySelector(this._targetElement);
            }

            if (!this._targetElement) {
                this._targetElement = document.body;
            }

            if (this._targetElement) {
                this._listElement = document.createElement(this._listType);
                this._listElement.className = this._listClassName;
                this._targetElement.appendChild(this._listElement);
            }
        }
    }

    _createAndGetNewListItem(type, log) {
        const item = document.createElement('li');
        item.textContent = log;
        item.className = this._listItemClassName + `${type.toLowerCase()}`;
        if (this._isColorModeEnabled) {
            item.style.color = typeToColorMapping[type];
        }
        return item;
    }
}
