import"chrome://new-tab-page/strings.m.js";import{d as decodeString16,a as assert,s as skColorToRgba,m as mojoTimeDelta,b as mojoString16,W as WindowProxy,E as EventTracker,N as NewTabPageProxy,$ as $$,r as recordOccurence,c as recordLoadDuration,e as recordPerdecage,I as I18nBehavior,C as ChromeCartProxy,M as ModuleDescriptor,f as ModuleRegistry,g as assertNotReached,h as strictQuery,B as BackgroundSelectionType,F as FocusOutlineManager,i as hexColorToSkColor,P as PromoBrowserCommandProxy,j as CustomizeDialogPage}from"./shared.rollup.js";export{$ as $$,B as BackgroundSelectionType,C as ChromeCartProxy,j as CustomizeDialogPage,k as ImgElement,M as ModuleDescriptor,f as ModuleRegistry,N as NewTabPageProxy,P as PromoBrowserCommandProxy,W as WindowProxy,n as createScrollBorders,d as decodeString16,b as mojoString16,l as recordDuration,c as recordLoadDuration,r as recordOccurence,e as recordPerdecage}from"./shared.rollup.js";import{PolymerElement,html,microTask,mixinBehaviors}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-webui.js";import"chrome://resources/mojo/mojo/public/js/mojo_bindings_lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/big_buffer.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/string16.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/time.mojom-lite.js";import"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-lite.js";import"chrome://resources/mojo/url/mojom/url.mojom-lite.js";import"chrome://new-tab-page/realbox/omnibox.mojom-lite.js";import"chrome://new-tab-page/realbox/realbox.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/text_direction.mojom-lite.js";import"chrome://new-tab-page/new_tab_page.mojom-lite.js";import"chrome://resources/js/cr.m.js";import"chrome://new-tab-page/modules/cart/chrome_cart.mojom-lite.js";import"chrome://new-tab-page/modules/drive/drive.mojom-lite.js";import"chrome://new-tab-page/modules/task_module/task_module.mojom-lite.js";import{oneGoogleBarApi}from"chrome://new-tab-page/one_google_bar_api.js";import"chrome://new-tab-page/promo_browser_command.mojom-lite.js";// Copyright 2020 The Chromium Authors. All rights reserved.
const DOCUMENT_MATCH_TYPE="document";class RealboxIconElement extends PolymerElement{static get is(){return"ntp-realbox-icon"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-icon">:host {
  align-items: center;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    width: 32px;
}

#imageContainer {
  align-items: center;
    border-radius: 8px;
    display: none;
    height: 32px;
    justify-content: center;
    overflow: hidden;
    width: 32px;
}

:host-context(ntp-realbox-match[has-image]) #imageContainer {
  display: flex;
}

#image {
  max-height: 32px;
    max-width: 32px;
}

#icon {
  -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 16px;
    background-color: var(--search-box-icon, var(--google-grey-refresh-700));
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 16px;
    height: 24px;
    width: 24px;
}

:host-context(ntp-realbox-match[has-image]) #icon {
  display: none;
}

:host([in-searchbox][background-image='google_g.png']) #icon {
  background-size: 12px;
}

:host([in-searchbox][mask-image='search.svg']) #icon {
  -webkit-mask-size: 20px;
}

</style>
<div id="imageContainer" style$="[[imageContainerStyle_]]">
    <img id="image" src$="[[imageSrc_]]">
</div>
<div id="icon" style$="[[iconStyle_]]">
</div>

<!--_html_template_end_-->`}static get properties(){return{backgroundImage:{type:String,computed:`computeBackgroundImage_(match.faviconDataUrl, match)`,reflectToAttribute:true},defaultIcon:{type:String,value:""},maskImage:{type:String,computed:`computeMaskImage_(match)`,reflectToAttribute:true},match:{type:Object},iconStyle_:{type:String,computed:`computeIconStyle_(backgroundImage, maskImage)`},imageContainerStyle_:{type:String,computed:`computeImageContainerStyle_(imageSrc_, match)`},imageSrc_:{type:String,computed:`computeImageSrc_(match.imageDataUrl, match)`}}}computeBackgroundImage_(){if(this.match&&!this.match.isSearchType){if(this.match.faviconDataUrl){return this.match.faviconDataUrl}else if(this.match.type===DOCUMENT_MATCH_TYPE){return this.match.iconUrl}else{return""}}else if(this.defaultIcon==="google_g.png"){return this.defaultIcon}else{return""}}computeMaskImage_(){if(this.match){return this.match.iconUrl}else{return this.defaultIcon}}computeIconStyle_(){if(this.backgroundImage){return`background-image: url(${this.backgroundImage});`+`background-color: transparent;`}else{return`-webkit-mask-image: url(${this.maskImage});`}}computeImageContainerStyle_(){return this.match&&this.match.imageDominantColor&&!this.imageSrc_?`background-color: ${this.match.imageDominantColor}40;`:"background-color: transparent;"}computeImageSrc_(){if(!this.match){return""}if(this.match.imageDataUrl){return this.match.imageDataUrl}else if(this.match.imageUrl&&this.match.imageUrl.startsWith("data:image/")){return this.match.imageUrl}else{return""}}}customElements.define(RealboxIconElement.is,RealboxIconElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const ACMatchClassificationStyle={NONE:0,URL:1<<0,MATCH:1<<1,DIM:1<<2};class RealboxMatchElement extends PolymerElement{static get is(){return"ntp-realbox-match"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons" scope="ntp-realbox-match">:host {
  align-items: center;
    cursor: default;
    display: flex;
    outline: none;
    padding-bottom: 6px;
    padding-inline-end: 16px;
    padding-inline-start: 12px;
    padding-top: 6px;
}

#container {
  align-items: center;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    padding-inline-end: 8px;
    padding-inline-start: 8px;
    white-space: nowrap;
}

#contents, #description {
  overflow: hidden;
    text-overflow: ellipsis;
}

#separator {
  white-space: pre;
}

:host([has-image]) #container {
  align-items: flex-start;
    flex-direction: column;
}

:host([has-image]) #separator {
  display: none;
}

:host([has-image]) #contents {
  width: 100%;
}

:host([has-image]) #description {
  font-size: .875em;
    width: 100%;
}

.match {
  font-weight: 500;
}

:host([has-image]) #description, .dim {
  color: var(--search-box-results-dim, var(--google-grey-refresh-700));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)):host([has-image]) #description, :host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) .dim {
  color: var(--search-box-results-dim-selected, var(--google-grey-refresh-700));
}

.url {
  color: var(--search-box-results-url, var(--google-blue-refresh-700));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) .url {
  color: var(--search-box-results-url-selected, var(--google-blue-refresh-700));
}

#remove {
  --cr-icon-button-active-background-color: rgba(var(--google-grey-900-rgb), .16);
    --cr-icon-button-fill-color: var(--search-box-icon, var(--google-grey-refresh-700));
    --cr-icon-button-hover-background-color: rgba(var(--google-grey-900-rgb), .1);
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-margin-end: 0;
    --cr-icon-button-margin-start: 0;
    --cr-icon-button-size: 24px;
    opacity: 0;
}

:host-context(ntp-realbox-match:hover) #remove {
  opacity: 1;
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) #remove {
  --cr-icon-button-fill-color: var(--search-box-icon-selected, var(--google-grey-refresh-700));
    opacity: 1;
}

</style>
<ntp-realbox-icon id="icon" match="[[match]]"></ntp-realbox-icon>
<div id="container">
  <span id="contents" inner-h-t-m-l="[[contentsHtml_]]"></span>
  <span id="separator" class="dim">[[separatorText_]]</span>
  <span id="description" inner-h-t-m-l="[[descriptionHtml_]]"></span>
</div>
<cr-icon-button id="remove" class="icon-clear" aria-label="[[removeButtonAriaLabel_]]" on-click="onRemoveButtonClick_" on-mousedown="onRemoveButtonMouseDown_" title="[[removeButtonTitle_]]" hidden$="[[!removeButtonIsVisible_]]">
</cr-icon-button>
<!--_html_template_end_-->`}static get properties(){return{ariaLabel:{type:String,computed:`computeAriaLabel_(matchText_, removeButtonIsVisible_)`,reflectToAttribute:true},hasImage:{type:Boolean,computed:`computeHasImage_(match)`,reflectToAttribute:true},match:{type:Object},matchIndex:{type:Number,value:-1},contentsHtml_:{type:String,computed:`computeContentsHtml_(match)`},descriptionHtml_:{type:String,computed:`computeDescriptionHtml_(match)`},matchText_:{type:String,computed:`computeMatchText_(match)`},removeButtonAriaLabel_:{type:String,computed:`computeRemoveButtonAriaLabel_(matchText_)`},removeButtonIsVisible_:{type:Boolean,computed:`computeRemoveButtonIsVisible_(match)`},removeButtonTitle_:{type:String,value:()=>loadTimeData.getString("removeSuggestion")},separatorText_:{type:String,computed:`computeSeparatorText_(match)`}}}ready(){super.ready();this.addEventListener("click",this.onMatchClick_.bind(this));this.addEventListener("focusin",this.onMatchFocusin_.bind(this))}onMatchClick_(e){if(e.button>1){return}this.dispatchEvent(new CustomEvent("match-click",{bubbles:true,composed:true,detail:{index:this.matchIndex,event:e}}));e.preventDefault();e.stopPropagation()}onMatchFocusin_(e){this.dispatchEvent(new CustomEvent("match-focusin",{bubbles:true,composed:true,detail:this.matchIndex}))}onRemoveButtonClick_(e){if(e.button!==0){return}this.dispatchEvent(new CustomEvent("match-remove",{bubbles:true,composed:true,detail:this.matchIndex}));e.preventDefault();e.stopPropagation()}onRemoveButtonMouseDown_(e){e.preventDefault()}computeMatchText_(){if(!this.match){return""}const contents=decodeString16(this.match.contents);const description=decodeString16(this.match.description);return this.match.swapContentsAndDescription?description+this.separatorText_+contents:contents+this.separatorText_+description}computeAriaLabel_(){return this.removeButtonIsVisible_?loadTimeData.getStringF("removeSuggestionA11ySuffix",this.matchText_):this.matchText_}computeContentsHtml_(){if(!this.match){return""}const match=this.match;return match.swapContentsAndDescription?this.renderTextWithClassifications_(decodeString16(match.description),match.descriptionClass).innerHTML:this.renderTextWithClassifications_(decodeString16(match.contents),match.contentsClass).innerHTML}computeDescriptionHtml_(){if(!this.match){return""}const match=this.match;return match.swapContentsAndDescription?this.renderTextWithClassifications_(decodeString16(match.contents),match.contentsClass).innerHTML:this.renderTextWithClassifications_(decodeString16(match.description),match.descriptionClass).innerHTML}computeHasImage_(){return this.match&&!!this.match.imageUrl}computeRemoveButtonIsVisible_(){return this.match&&this.match.supportsDeletion}computeRemoveButtonAriaLabel_(){return loadTimeData.getStringF("removeSuggestionA11yPrefix",this.matchText_)}computeSeparatorText_(){return this.match&&decodeString16(this.match.description)?loadTimeData.getString("realboxSeparator"):""}convertClassificationStyleToCSSClasses_(style){const classes=[];if(style&ACMatchClassificationStyle.DIM){classes.push("dim")}if(style&ACMatchClassificationStyle.MATCH){classes.push("match")}if(style&ACMatchClassificationStyle.URL){classes.push("url")}return classes}createSpanWithClasses_(text,classes){const span=document.createElement("span");if(classes.length){span.classList.add(...classes)}span.textContent=text;return span}renderTextWithClassifications_(text,classifications){return classifications.map((({offset:offset,style:style},index)=>{const next=classifications[index+1]||{offset:text.length};const subText=text.substring(offset,next.offset);const classes=this.convertClassificationStyleToCSSClasses_(style);return this.createSpanWithClasses_(subText,classes)})).reduce(((container,currentElement)=>{container.appendChild(currentElement);return container}),document.createElement("span"))}}customElements.define(RealboxMatchElement.is,RealboxMatchElement);// Copyright 2020 The Chromium Authors. All rights reserved.
let instance=null;class RealboxBrowserProxy{static getInstance(){return instance||(instance=new RealboxBrowserProxy)}static setInstance(newInstance){instance=newInstance}constructor(){this.handler=realbox.mojom.PageHandler.getRemote();this.callbackRouter=new realbox.mojom.PageCallbackRouter;this.handler.setPage(this.callbackRouter.$.bindNewPipeAndPassRemote())}}// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxDropdownElement extends PolymerElement{static get is(){return"ntp-realbox-dropdown"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-dropdown">:host {
  user-select: none;
}

#selector {
  background-color: var(--search-box-results-bg, white);
    border-radius: calc(0.25 * var(--ntp-realbox-height));
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    display: block;
    margin-bottom: 8px;
    padding-bottom: 8px;
    padding-top: var(--ntp-realbox-height);
}

@media (forced-colors: active) {
#selector {
  border: 1px solid ActiveBorder;
}

}

ntp-realbox-match {
  color: var(--search-box-results-text);
}

.header {
  align-items: center;
    display: flex;
    margin-top: 8px;
    outline: none;
    padding-bottom: 6px;
    padding-inline-end: 16px;
    padding-inline-start: 12px;
    padding-top: 6px;
}

.header .text {
  color: var(--search-box-results-dim, var(--google-grey-refresh-700));
    cursor: default;
    font-size: .875em;
    font-weight: 500;
    overflow: hidden;
    padding-inline-end: 8px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
}

.header cr-icon-button {
  --cr-icon-button-fill-color: var(--search-box-icon, var(--google-grey-refresh-700));
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-margin-start: 0;
    --cr-icon-button-size: 24px;
    --cr-icon-image: url(icons/chevron.svg);
    --cr-icon-image-transform: rotate(180deg);
}

.header[group-is-hidden] cr-icon-button {
  --cr-icon-image-transform: none;
}

.header:focus-within:not(:focus) cr-icon-button {
  --cr-icon-button-fill-color: var(--search-box-icon-selected, var(--google-grey-refresh-700));
}

ntp-realbox-match:hover, .header:hover {
  background-color: var(--search-box-results-bg-hovered, rgba(var(--google-grey-900-rgb), .1));
}

ntp-realbox-match:-webkit-any(:focus-within, .selected), .header:focus-within:not(:focus) {
  background-color: var(--search-box-results-bg-selected, rgba(var(--google-grey-900-rgb), .16));
    color: var(--search-box-results-text-selected, var(--google-grey-900));
}

@media (forced-colors: active) {
ntp-realbox-match:hover, .header:hover {
  background-color: Highlight;
}

ntp-realbox-match:-webkit-any(:focus-within, .selected), .header:focus-within:not(:focus) {
  background-color: Highlight;
}

}

</style>
<iron-selector id="selector" selectable="ntp-realbox-match" items="{{selectableMatchElements_}}" selected="{{selectedMatchIndex}}" selected-class="selected">
  <template is="dom-repeat" id="groups" items="[[groupIds_]]" as="groupId">
    <template is="dom-if" if="[[groupHasHeader_(groupId)]]">
      <!-- Header cannot be tabbed into but gets focus when clicked. This stops
           the dropdown from losing focus and closing as a result. -->
      <div class="header" data-id$="[[groupId]]" tabindex="-1" on-focusin="onHeaderFocusin_" on-click="onHeaderClick_" aria-hidden="true" group-is-hidden$="[[groupIsHidden_(groupId, hiddenGroupIds_.*)]]">
        <span class="text">[[headerForGroup_(groupId)]]</span>
        <cr-icon-button class="icon-clear" title="[[toggleButtonTitleForGroup_(groupId, hiddenGroupIds_.*)]]" aria-label$="[[toggleButtonA11yLabelForGroup_(groupId, hiddenGroupIds_.*)]]" on-mousedown="onToggleButtonMouseDown_">
        </cr-icon-button>
      </div>
    </template>
    <template is="dom-if" if="[[!groupIsHidden_(groupId, hiddenGroupIds_.*)]]" restamp="">
      <template is="dom-repeat" items="[[result.matches]]" filter="[[computeMatchBelongsToGroup_(groupId)]]" on-dom-change="onResultRepaint_">
        <ntp-realbox-match tabindex="0" role="option" match="[[item]]" match-index="[[matchIndex_(item)]]">
        </ntp-realbox-match>
      </template>
    </template>
  <template>

<!--_html_template_end_--></template></template></iron-selector>`}static get properties(){return{result:{type:Object},selectedMatchIndex:{type:Number,value:-1,notify:true},theme:{type:Object,observer:"onThemeChange_"},groupIds_:{type:Array,computed:`computeGroupIds_(result)`},hiddenGroupIds_:{type:Array,computed:`computeHiddenGroupIds_(result)`},selectableMatchElements_:{type:Array,value:()=>[]}}}constructor(){super();this.callbackRouter_=RealboxBrowserProxy.getInstance().callbackRouter;this.pageHandler_=RealboxBrowserProxy.getInstance().handler;this.autocompleteMatchImageAvailableListenerId_=null}connectedCallback(){super.connectedCallback();this.autocompleteMatchImageAvailableListenerId_=this.callbackRouter_.autocompleteMatchImageAvailable.addListener(this.onAutocompleteMatchImageAvailable_.bind(this))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.autocompleteMatchImageAvailableListenerId_))}unselect(){this.selectedMatchIndex=-1}focusSelected(){if(this.$.selector.selectedItem){this.$.selector.selectedItem.focus()}}selectFirst(){this.selectedMatchIndex=0}selectIndex(index){this.selectedMatchIndex=index}selectPrevious(){this.selectedMatchIndex=this.selectedMatchIndex-1>=0?this.selectedMatchIndex-1:this.selectableMatchElements_.length-1}selectLast(){this.selectedMatchIndex=this.selectableMatchElements_.length-1}selectNext(){this.selectedMatchIndex=this.selectedMatchIndex+1<this.selectableMatchElements_.length?this.selectedMatchIndex+1:0}onAutocompleteMatchImageAvailable_(matchIndex,url,dataUrl){if(!this.result||!this.result.matches){return}const match=this.result.matches[matchIndex];if(!match){return}if(match.destinationUrl.url===url.url){this.set(`result.matches.${matchIndex}.faviconDataUrl`,dataUrl)}else if(match.imageUrl===url.url){this.set(`result.matches.${matchIndex}.imageDataUrl`,dataUrl)}}onResultRepaint_(){this.dispatchEvent(new CustomEvent("result-repaint",{bubbles:true,composed:true,detail:window.performance.now()}))}onThemeChange_(){if(!loadTimeData.getBoolean("realboxMatchOmniboxTheme")){return}this.updateStyles({"--search-box-icon":skColorToRgba(this.theme.icon),"--search-box-results-bg-hovered":skColorToRgba(assert(this.theme.resultsBgHovered)),"--search-box-results-bg-selected":skColorToRgba(assert(this.theme.resultsBgSelected)),"--search-box-results-bg":skColorToRgba(assert(this.theme.resultsBg)),"--search-box-results-dim-selected":skColorToRgba(assert(this.theme.resultsDimSelected)),"--search-box-results-dim":skColorToRgba(assert(this.theme.resultsDim)),"--search-box-results-text-selected":skColorToRgba(assert(this.theme.resultsTextSelected)),"--search-box-results-text":skColorToRgba(assert(this.theme.resultsText)),"--search-box-results-url-selected":skColorToRgba(assert(this.theme.resultsUrlSelected)),"--search-box-results-url":skColorToRgba(assert(this.theme.resultsUrl))})}onHeaderFocusin_(){this.dispatchEvent(new CustomEvent("header-focusin",{bubbles:true,composed:true}))}onHeaderClick_(e){const groupId=Number(e.currentTarget.dataset.id);this.pageHandler_.toggleSuggestionGroupIdVisibility(groupId);const index=this.hiddenGroupIds_.indexOf(groupId);if(index===-1){this.push("hiddenGroupIds_",groupId)}else{this.splice("hiddenGroupIds_",index,1)}}onToggleButtonMouseDown_(e){e.preventDefault()}matchIndex_(match){if(!this.result||!this.result.matches){return-1}return this.result.matches.indexOf(match)}computeGroupIds_(){if(!this.result||!this.result.matches){return[]}return[...new Set(this.result.matches.map((match=>match.suggestionGroupId)))]}computeHiddenGroupIds_(){if(!this.result){return[]}return Object.keys(this.result.suggestionGroupsMap).map((groupId=>Number(groupId))).filter((groupId=>this.result.suggestionGroupsMap[groupId].hidden).bind(this))}computeMatchBelongsToGroup_(groupId){return match=>match.suggestionGroupId===groupId}groupHasHeader_(groupId){return!!this.headerForGroup_(groupId)}groupIsHidden_(groupId){return this.hiddenGroupIds_.indexOf(groupId)!==-1}headerForGroup_(groupId){return this.result&&this.result.suggestionGroupsMap&&this.result.suggestionGroupsMap[groupId]?decodeString16(this.result.suggestionGroupsMap[groupId].header):""}toggleButtonTitleForGroup_(groupId){if(!this.groupHasHeader_(groupId)){return""}return loadTimeData.getString(this.groupIsHidden_(groupId)?"showSuggestions":"hideSuggestions")}toggleButtonA11yLabelForGroup_(groupId){if(!this.groupHasHeader_(groupId)){return""}return loadTimeData.substituteString(loadTimeData.getString(this.groupIsHidden_(groupId)?"showSection":"hideSection"),this.headerForGroup_(groupId))}}customElements.define(RealboxDropdownElement.is,RealboxDropdownElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxElement extends PolymerElement{static get is(){return"ntp-realbox"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox">:host {
  --ntp-realbox-height: 44px;
    border-radius: calc(0.5 * var(--ntp-realbox-height));
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    font-size: 16px;
    height: var(--ntp-realbox-height);
}

@media (forced-colors: active) {
:host {
  border: 1px solid ActiveBorder;
}

}

:host([matches-are-visible]) {
  box-shadow: none;
}

#inputWrapper {
  height: 100%;
    position: relative;
}

input {
  background-color: var(--search-box-bg, white);
    border: none;
    border-radius: calc(0.5 * var(--ntp-realbox-height));
    color: var(--search-box-text);
    font-family: inherit;
    font-size: inherit;
    height: 100%;
    outline: none;
    padding-inline-end:  44px;
    padding-inline-start: 52px;
    position: relative;
    width: 100%;
}

input::-webkit-search-decoration, input::-webkit-search-cancel-button, input::-webkit-search-results-button, input::-webkit-search-results-decoration {
  display: none;
}

input::placeholder {
  color: var(--search-box-placeholder, var(--google-grey-refresh-700));
}

input:focus, :host([matches-are-visible]) input {
  background-color: var(--search-box-results-bg, white);
}

ntp-realbox-icon {
  height: 100%;
    left: 12px;
    position: absolute;
    top: 0;
}

:host-context([dir='rtl']) ntp-realbox-icon {
  left: unset;
    right: 12px;
}

#voiceSearchButton {
  background: url(icons/googlemic_clr_24px.svg) no-repeat center;
    background-size: 21px 21px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    height: 100%;
    outline: none;
    padding: 0;
    pointer-events: auto;
    position: absolute;
    right: 16px;
    width: 26px;
}

:host-context([dir='rtl']) #voiceSearchButton {
  left: 16px;
    right: unset;
}

:host-context(.focus-outline-visible) #voiceSearchButton:focus {
  box-shadow: var(--ntp-focus-shadow);
}

:-webkit-any(input, ntp-realbox-icon, #voiceSearchButton) {
  z-index: 2;
}

ntp-realbox-dropdown {
  left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
}

</style>
<div id="inputWrapper" on-focusout="onInputWrapperFocusout_" on-keydown="onInputWrapperKeydown_">
  <input id="input" type="search" autocomplete="off" spellcheck="false" aria-live="[[inputAriaLive_]]" role="combobox" placeholder="Search Google or type a URL" on-copy="onInputCutCopy_" on-cut="onInputCutCopy_" on-focus="onInputFocus_" on-blur="onInputBlur_" on-input="onInputInput_" on-keydown="onInputKeydown_" on-keyup="onInputKeyup_" on-mousedown="onInputMouseDown_" on-paste="onInputPaste_">
  <ntp-realbox-icon id="icon" match="[[selectedMatch_]]" default-icon="[[realboxIcon_]]" in-searchbox="">
  </ntp-realbox-icon>
  <button id="voiceSearchButton" on-click="onVoiceSearchClick_" title="Search by voice">
  </button>
  <ntp-realbox-dropdown id="matches" role="listbox" theme="[[theme]]" result="[[result_]]" selected-match-index="{{selectedMatchIndex_}}" on-result-repaint="onResultRepaint_" on-match-focusin="onMatchFocusin_" on-match-click="onMatchClick_" on-match-remove="onMatchRemove_" on-header-focusin="onHeaderFocusin_" hidden$="[[!matchesAreVisible]]">
  </ntp-realbox-dropdown>
</div>
<!--_html_template_end_-->`}static get properties(){return{matchesAreVisible:{type:Boolean,value:false,reflectToAttribute:true},theme:{type:Object,observer:"onThemeChange_"},charTypedTime_:{type:Number,value:0},isDeletingInput_:{type:Boolean,value:false},lastIgnoredEnterEvent_:{type:Object,value:null},lastInput_:{type:Object,value:{text:"",inline:""}},lastInputFocusTime_:{type:Number,value:null},lastQueriedInput_:{type:String,value:null},pastedInInput_:{type:Boolean,value:false},realboxIcon_:{type:String,value:()=>loadTimeData.getString("realboxDefaultIcon")},result_:{type:Object},selectedMatch_:{type:Object,computed:`computeSelectedMatch_(result_, selectedMatchIndex_)`},selectedMatchIndex_:{type:Number,value:-1},inputAriaLive_:{type:String,computed:`computeInputAriaLive_(selectedMatch_)`}}}computeInputAriaLive_(){return this.selectedMatch_?"off":"polite"}constructor(){performance.mark("realbox-creation-start");super();this.pageHandler_=RealboxBrowserProxy.getInstance().handler;this.callbackRouter_=RealboxBrowserProxy.getInstance().callbackRouter;this.autocompleteResultChangedListenerId_=null;this.autocompleteMatchImageAvailableListenerId_=null}connectedCallback(){super.connectedCallback();this.autocompleteResultChangedListenerId_=this.callbackRouter_.autocompleteResultChanged.addListener(this.onAutocompleteResultChanged_.bind(this));this.autocompleteMatchImageAvailableListenerId_=this.callbackRouter_.autocompleteMatchImageAvailable.addListener(this.onAutocompleteMatchImageAvailable_.bind(this))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.autocompleteResultChangedListenerId_));this.callbackRouter_.removeListener(assert(this.autocompleteMatchImageAvailableListenerId_))}ready(){super.ready();performance.measure("realbox-creation","realbox-creation-start")}onAutocompleteMatchImageAvailable_(matchIndex,url,dataUrl){if(!this.result_||!this.result_.matches){return}const match=this.result_.matches[matchIndex];if(!match||this.selectedMatchIndex_!==matchIndex){return}if(match.destinationUrl.url===url.url){match.faviconDataUrl=dataUrl;this.notifyPath("selectedMatch_.faviconDataUrl")}}onAutocompleteResultChanged_(result){if(this.lastQueriedInput_===null||this.lastQueriedInput_.trimLeft()!==decodeString16(result.input)){return}this.result_=result;const hasMatches=result&&result.matches&&result.matches.length>0;this.matchesAreVisible=hasMatches;this.$.input.focus();const firstMatch=hasMatches?this.result_.matches[0]:null;if(firstMatch&&firstMatch.allowedToBeDefaultMatch){this.$.matches.selectFirst();this.updateInput_({text:this.lastQueriedInput_,inline:decodeString16(firstMatch.inlineAutocompletion)||""});if(this.lastIgnoredEnterEvent_){this.navigateToMatch_(0,this.lastIgnoredEnterEvent_);this.lastIgnoredEnterEvent_=null}}else if(hasMatches&&this.selectedMatchIndex_!==-1&&this.selectedMatchIndex_<this.result_.matches.length){this.$.matches.selectIndex(this.selectedMatchIndex_);this.updateInput_({text:decodeString16(this.selectedMatch_.fillIntoEdit),inline:"",moveCursorToEnd:true})}else{this.$.matches.unselect();this.updateInput_({inline:""})}}onThemeChange_(){if(!loadTimeData.getBoolean("realboxMatchOmniboxTheme")){return}this.updateStyles({"--search-box-bg":skColorToRgba(assert(this.theme.bg)),"--search-box-placeholder":skColorToRgba(assert(this.theme.placeholder)),"--search-box-results-bg":skColorToRgba(assert(this.theme.resultsBg)),"--search-box-text":skColorToRgba(assert(this.theme.text)),"--search-box-icon":skColorToRgba(assert(this.theme.icon))})}onHeaderFocusin_(){assert(this.lastQueriedInput_==="");this.$.matches.unselect();this.updateInput_({text:"",inline:""})}onInputCutCopy_(e){if(!this.$.input.value||this.$.input.selectionStart!==0||this.$.input.selectionEnd!==this.$.input.value.length||!this.result_||this.result_.matches.length===0){return}if(this.selectedMatch_&&!this.selectedMatch_.isSearchType){e.clipboardData.setData("text/plain",this.selectedMatch_.destinationUrl.url);e.preventDefault();if(e.type==="cut"){this.$.input.value=""}}}onInputFocus_(e){this.lastInputFocusTime_=window.performance.now();e.target.placeholder=""}onInputBlur_(e){e.target.placeholder=loadTimeData.getString("realboxHint")}onInputInput_(e){const inputValue=this.$.input.value;const lastInputValue=this.lastInput_.text+this.lastInput_.inline;if(lastInputValue===inputValue){return}this.updateInput_({text:inputValue,inline:""});const charTyped=!this.isDeletingInput_&&!!inputValue.trim();this.charTypedTime_=charTyped?this.charTypedTime_||window.performance.now():0;if(inputValue.trim()){this.queryAutocomplete_(inputValue,e.isComposing)}else{this.clearAutocompleteMatches_()}this.pastedInInput_=false}onInputKeydown_(e){if(!this.lastInput_.inline){return}const inputValue=this.$.input.value;const inputSelection=inputValue.substring(this.$.input.selectionStart,this.$.input.selectionEnd);const lastInputValue=this.lastInput_.text+this.lastInput_.inline;if(inputSelection===this.lastInput_.inline&&inputValue===lastInputValue&&this.lastInput_.inline[0].toLocaleLowerCase()===e.key.toLocaleLowerCase()){this.updateInput_({text:assert(this.lastInput_.text+e.key),inline:this.lastInput_.inline.substr(1)});this.charTypedTime_=this.charTypedTime_||window.performance.now();this.queryAutocomplete_(this.lastInput_.text);e.preventDefault()}}onInputKeyup_(e){if(e.key!=="Tab"){return}if(!this.$.input.value){this.queryAutocomplete_("")}}onInputMouseDown_(e){if(e.button!==0){return}if(!this.$.input.value){this.queryAutocomplete_("")}}onInputPaste_(e){this.pastedInInput_=true}onInputWrapperFocusout_(e){const relatedTarget=e.relatedTarget;if(!this.$.inputWrapper.contains(relatedTarget)){if(this.lastQueriedInput_===""){this.updateInput_({text:"",inline:""});this.clearAutocompleteMatches_()}else{this.matchesAreVisible=false;this.pageHandler_.stopAutocomplete(false)}}}onInputWrapperKeydown_(e){const KEYDOWN_HANDLED_KEYS=["ArrowDown","ArrowUp","Delete","Enter","Escape","PageDown","PageUp"];if(!KEYDOWN_HANDLED_KEYS.includes(e.key)){return}if(e.defaultPrevented){return}if(!this.matchesAreVisible){if(e.key==="ArrowUp"||e.key==="ArrowDown"){const inputValue=this.$.input.value;if(inputValue.trim()||!inputValue){this.queryAutocomplete_(inputValue)}e.preventDefault();return}}if(!this.result_||this.result_.matches.length===0){return}if(e.key==="Delete"){if(e.shiftKey&&!e.altKey&&!e.ctrlKey&&!e.metaKey){if(this.selectedMatch_&&this.selectedMatch_.supportsDeletion){this.pageHandler_.deleteAutocompleteMatch(this.selectedMatchIndex_);e.preventDefault()}}return}if(e.isComposing){return}if(e.key==="Enter"){if([this.$.matches,this.$.input].includes(e.target)){if(this.lastQueriedInput_!==null&&this.lastQueriedInput_.trimLeft()===decodeString16(this.result_.input)){if(this.selectedMatch_){this.navigateToMatch_(this.selectedMatchIndex_,e)}}else{this.lastIgnoredEnterEvent_=e;e.preventDefault()}}return}if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey){return}if(e.key==="Escape"&&this.selectedMatchIndex_<=0){this.updateInput_({text:"",inline:""});this.clearAutocompleteMatches_();e.preventDefault();return}if(e.key==="ArrowDown"){this.$.matches.selectNext()}else if(e.key==="ArrowUp"){this.$.matches.selectPrevious()}else if(e.key==="Escape"||e.key==="PageUp"){this.$.matches.selectFirst()}else if(e.key==="PageDown"){this.$.matches.selectLast()}e.preventDefault();if(this.shadowRoot.activeElement===this.$.matches){this.$.matches.focusSelected()}const newFill=decodeString16(this.selectedMatch_.fillIntoEdit);const newInline=this.selectedMatch_.allowedToBeDefaultMatch?decodeString16(this.selectedMatch_.inlineAutocompletion):"";const newFillEnd=newFill.length-newInline.length;this.updateInput_({text:assert(newFill.substr(0,newFillEnd)),inline:newInline,moveCursorToEnd:newInline.length===0})}onMatchClick_(e){this.navigateToMatch_(e.detail.index,e.detail.event)}onMatchFocusin_(e){this.$.matches.selectIndex(e.detail);this.updateInput_({text:decodeString16(this.selectedMatch_.fillIntoEdit),inline:"",moveCursorToEnd:true})}onMatchRemove_(e){this.pageHandler_.deleteAutocompleteMatch(e.detail)}onResultRepaint_(e){if(this.charTypedTime_){this.pageHandler_.logCharTypedToRepaintLatency(mojoTimeDelta(e.detail-this.charTypedTime_));this.charTypedTime_=0}}onVoiceSearchClick_(){this.dispatchEvent(new Event("open-voice-search"))}computeSelectedMatch_(){if(!this.result_||!this.result_.matches){return null}return this.result_.matches[this.selectedMatchIndex_]||null}clearAutocompleteMatches_(){this.matchesAreVisible=false;this.result_=null;this.$.matches.unselect();this.pageHandler_.stopAutocomplete(true);this.lastQueriedInput_=null}navigateToMatch_(matchIndex,e){assert(matchIndex>=0);const match=assert(this.result_.matches[matchIndex]);assert(this.lastInputFocusTime_);const delta=mojoTimeDelta(window.performance.now()-this.lastInputFocusTime_);this.pageHandler_.openAutocompleteMatch(matchIndex,match.destinationUrl,this.matchesAreVisible,delta,e.button||0,e.altKey,e.ctrlKey,e.metaKey,e.shiftKey);e.preventDefault()}queryAutocomplete_(input,preventInlineAutocomplete=false){this.lastQueriedInput_=input;const caretNotAtEnd=this.$.input.selectionStart!==input.length;preventInlineAutocomplete=preventInlineAutocomplete||this.isDeletingInput_||this.pastedInInput_||caretNotAtEnd;this.pageHandler_.queryAutocomplete(mojoString16(input),preventInlineAutocomplete)}updateInput_(update){const newInput=Object.assign({},this.lastInput_,update);const newInputValue=newInput.text+newInput.inline;const lastInputValue=this.lastInput_.text+this.lastInput_.inline;const inlineDiffers=newInput.inline!==this.lastInput_.inline;const preserveSelection=!inlineDiffers&&!update.moveCursorToEnd;let needsSelectionUpdate=!preserveSelection;const oldSelectionStart=this.$.input.selectionStart;const oldSelectionEnd=this.$.input.selectionEnd;if(newInputValue!==this.$.input.value){this.$.input.value=newInputValue;needsSelectionUpdate=true}if(newInputValue.trim()&&needsSelectionUpdate){this.$.input.selectionStart=preserveSelection?oldSelectionStart:update.moveCursorToEnd?newInputValue.length:newInput.text.length;this.$.input.selectionEnd=preserveSelection?oldSelectionEnd:newInputValue.length}this.isDeletingInput_=lastInputValue.length>newInputValue.length&&lastInputValue.startsWith(newInputValue);this.lastInput_=newInput}}customElements.define(RealboxElement.is,RealboxElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const FACEBOOK_APP_ID=738026486351791;class DoodleShareDialogElement extends PolymerElement{static get is(){return"ntp-doodle-share-dialog"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-doodle-share-dialog">#dialog::part(dialog) {
  max-width: 300px;
}

#buttons {
  display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 28px;
    margin-top: 20px;
}

#buttons cr-button {
  background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    height: 48px;
    min-width: 48px;
    width: 48px;
}

#buttons cr-button:hover {
  opacity: 0.8;
}

#buttons > :not(:last-child) {
  margin-inline-end: 12px;
}

#facebookButton {
  background-image: url(icons/facebook.svg);
}

#twitterButton {
  background-image: url(icons/twitter.svg);
}

#emailButton {
  background-image: url(icons/mail.svg);
}

#url {
  --cr-input-error-display: none;
}

#copyButton {
  --cr-icon-image: url(icons/copy.svg);
    margin-inline-start: 2px;
}

</style>
<cr-dialog id="dialog" show-on-attach="">
  <div id="title" slot="title">
    [[title]]
  </div>
  <div slot="body">
    <div id="buttons">
      <cr-button id="facebookButton" title="Facebook" on-click="onFacebookClick_">
      </cr-button>
      <cr-button id="twitterButton" title="Twitter" on-click="onTwitterClick_">
      </cr-button>
      <cr-button id="emailButton" title="E-mail" on-click="onEmailClick_">
      </cr-button>
    </div>
    <cr-input readonly="" label="Doodle Link" id="url" value="[[url.url]]">
      <cr-icon-button id="copyButton" slot="suffix" title="Copy Link" on-click="onCopyClick_">
      </cr-icon-button>
    </cr-input>
  </div>
  <div slot="button-container">
    <cr-button id="doneButton" class="action-button" on-click="onCloseClick_">
      Done
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}static get properties(){return{title:String,url:Object}}onFacebookClick_(){const url="https://www.facebook.com/dialog/share"+`?app_id=${FACEBOOK_APP_ID}`+`&href=${encodeURIComponent(this.url.url)}`+`&hashtag=${encodeURIComponent("#GoogleDoodle")}`;WindowProxy.getInstance().open(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kFacebook)}onTwitterClick_(){const url="https://twitter.com/intent/tweet"+`?text=${encodeURIComponent(`${this.title}\n${this.url.url}`)}`;WindowProxy.getInstance().open(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kTwitter)}onEmailClick_(){const url=`mailto:?subject=${encodeURIComponent(this.title)}`+`&body=${encodeURIComponent(this.url.url)}`;WindowProxy.getInstance().navigate(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kEmail)}onCopyClick_(){this.$.url.select();navigator.clipboard.writeText(this.url.url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kLinkCopy)}onCloseClick_(){this.$.dialog.close()}notifyShare_(channel){this.dispatchEvent(new CustomEvent("share",{detail:channel}))}}customElements.define(DoodleShareDialogElement.is,DoodleShareDialogElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const SHARE_BUTTON_SIZE_PX=26;class LogoElement extends PolymerElement{static get is(){return"ntp-logo"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="ntp-logo">:host {
  --ntp-logo-height: 200px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: flex-end;
    min-height: var(--ntp-logo-height);
}

:host([doodle-boxed_]) {
  justify-content: flex-end;
}

#logo {
  forced-color-adjust: none;
    height: 92px;
    width: 272px;
}

:host([single-colored]) #logo {
  -webkit-mask-image: url(./icons/google_logo.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--ntp-logo-color);
}

:host(:not([single-colored])) #logo {
  background-image: url(./icons/google_logo.svg);
}

#imageDoodle {
  cursor: pointer;
    outline: none;
}

:host([doodle-boxed_]) #imageDoodle {
  background-color: var(--ntp-logo-box-color);
    border-radius: 20px;
    padding: 16px 24px;
}

:host-context(.focus-outline-visible) #imageDoodle:focus {
  box-shadow: 0 0 0 2px rgba(var(--google-blue-600-rgb), .4);
}

#imageContainer {
  display: flex;
    height: fit-content;
    position: relative;
    width: fit-content;
}

#image {
  max-height: var(--ntp-logo-height);
    max-width: 100%;
}

:host([doodle-boxed_]) #image {
  max-height: 160px;
}

#animation {
  height: 100%;
    pointer-events: none;
    position: absolute;
    width: 100%;
}

#shareButton {
  background-color: var(--ntp-logo-share-button-background-color, none);
    border: none;
    height: var(--ntp-logo-share-button-height, 0);
    left: var(--ntp-logo-share-button-x, 0);
    min-width: var(--ntp-logo-share-button-width, 0);
    opacity: 0.8;
    outline: initial;
    padding: 2px;
    position: absolute;
    top: var(--ntp-logo-share-button-y, 0);
    width: var(--ntp-logo-share-button-width, 0);
}

#shareButton:hover {
  opacity: 1;
}

#shareButton img {
  height: 100%;
    width: 100%;
}

#iframe {
  border: none;
    height: var(--height, var(--ntp-logo-height));
    transition-duration: var(--duration, 100ms);
    transition-property: height, width;
    width: var(--width, 100%);
}

#iframe:not([expanded]) {
  max-height: var(--ntp-logo-height);
}

</style>

<template is="dom-if" if="[[showLogo_]]" restamp="">
  <div id="logo"></div>
</template>
<template is="dom-if" if="[[showDoodle_]]" restamp="">
  <div id="doodle" title="[[doodle_.description]]">
    <div id="imageDoodle" hidden="[[!imageDoodle_]]" tabindex="0" on-click="onImageClick_" on-keydown="onImageKeydown_">
      <div id="imageContainer">
        <!-- The static image is always visible and the animated image is
             stacked on top of the static image so that there is no flicker
             when starting the animation. -->
        <img id="image" src="[[imageUrl_]]" on-load="onImageLoad_">
        <ntp-iframe id="animation" src="[[animationUrl_]]" hidden="[[!showAnimation_]]">
        </ntp-iframe>
        <cr-button id="shareButton" title="Share Doodle" on-click="onShareButtonClick_" hidden="[[!imageDoodle_.shareButton]]">
          <img id="shareButtonImage" src="[[imageDoodle_.shareButton.iconUrl.url]]">
          
        </cr-button>
      </div>
    </div>
    <template is="dom-if" if="[[iframeUrl_]]" restamp="">
      <ntp-iframe id="iframe" src="[[iframeUrl_]]" expanded$="[[expanded_]]">
      </ntp-iframe>
    </template>
  </div>
</template>
<template is="dom-if" if="[[showShareDialog_]]" restamp="">
  <ntp-doodle-share-dialog title="[[doodle_.description]]" url="[[doodle_.image.shareUrl]]" on-close="onShareDialogClose_" on-share="onShare_">
  </ntp-doodle-share-dialog>
</template>
<!--_html_template_end_-->`}static get properties(){return{singleColored:{reflectToAttribute:true,type:Boolean,value:false},dark:{observer:"onDarkChange_",type:Boolean},backgroundColor:Object,loaded_:Boolean,doodle_:Object,imageDoodle_:{observer:"onImageDoodleChange_",computed:"computeImageDoodle_(dark, doodle_)",type:Object},showLogo_:{computed:"computeShowLogo_(loaded_, showDoodle_)",type:Boolean},showDoodle_:{computed:"computeShowDoodle_(doodle_, imageDoodle_)",type:Boolean},doodleBoxed_:{reflectToAttribute:true,type:Boolean,computed:"computeDoodleBoxed_(backgroundColor, imageDoodle_)"},imageUrl_:{computed:"computeImageUrl_(imageDoodle_)",type:String},showAnimation_:{type:Boolean,value:false},animationUrl_:{computed:"computeAnimationUrl_(imageDoodle_)",type:String},iframeUrl_:{computed:"computeIframeUrl_(doodle_)",type:String},duration_:{observer:"onDurationHeightWidthChange_",type:String},height_:{observer:"onDurationHeightWidthChange_",type:String},width_:{observer:"onDurationHeightWidthChange_",type:String},expanded_:Boolean,showShareDialog_:Boolean}}constructor(){performance.mark("logo-creation-start");super();this.eventTracker_=new EventTracker;this.pageHandler_=NewTabPageProxy.getInstance().handler;this.pageHandler_.getDoodle().then((({doodle:doodle})=>{this.doodle_=doodle;this.loaded_=true;if(this.doodle_&&this.doodle_.interactive){this.width_=`${this.doodle_.interactive.width}px`;this.height_=`${this.doodle_.interactive.height}px`}}));this.imageClickParams_=null;this.interactionLogUrl_=null;this.shareId_=null}connectedCallback(){super.connectedCallback();this.eventTracker_.add(window,"message",(({data:data})=>{if(data["cmd"]==="resizeDoodle"){this.duration_=assert(data.duration);this.height_=assert(data.height);this.width_=assert(data.width);this.expanded_=true}else if(data["cmd"]==="sendMode"){this.sendMode_()}}));this.sendMode_()}disconnectedCallback(){super.disconnectedCallback();this.eventTracker_.removeAll()}ready(){super.ready();performance.measure("logo-creation","logo-creation-start")}onImageDoodleChange_(){const shareButton=this.imageDoodle_&&this.imageDoodle_.shareButton;if(shareButton){const height=this.imageDoodle_.height;const width=this.imageDoodle_.width;this.updateStyles({"--ntp-logo-share-button-background-color":skColorToRgba(shareButton.backgroundColor),"--ntp-logo-share-button-height":`${SHARE_BUTTON_SIZE_PX/height*100}%`,"--ntp-logo-share-button-width":`${SHARE_BUTTON_SIZE_PX/width*100}%`,"--ntp-logo-share-button-x":`${shareButton.x/width*100}%`,"--ntp-logo-share-button-y":`${shareButton.y/height*100}%`})}else{this.updateStyles({"--ntp-logo-share-button-background-color":null,"--ntp-logo-share-button-height":null,"--ntp-logo-share-button-width":null,"--ntp-logo-share-button-x":null,"--ntp-logo-share-button-y":null})}if(this.imageDoodle_){this.updateStyles({"--ntp-logo-box-color":skColorToRgba(this.imageDoodle_.backgroundColor)})}else{this.updateStyles({"--ntp-logo-box-color":null})}this.showAnimation_=false;this.imageClickParams_=null;this.interactionLogUrl_=null;this.shareId_=null}computeImageDoodle_(){return this.doodle_&&this.doodle_.image&&(this.dark?this.doodle_.image.dark:this.doodle_.image.light)||null}computeShowLogo_(){return!!this.loaded_&&!this.showDoodle_}computeShowDoodle_(){return!!this.imageDoodle_||!!this.doodle_&&!!this.doodle_.interactive&&window.navigator.onLine}computeDoodleBoxed_(){return!this.backgroundColor||!!this.imageDoodle_&&this.imageDoodle_.backgroundColor.value!==this.backgroundColor.value}onImageClick_(){if(this.isCtaImageShown_()){this.showAnimation_=true;this.pageHandler_.onDoodleImageClicked(newTabPage.mojom.DoodleImageType.kCta,this.interactionLogUrl_);this.logImageRendered_(newTabPage.mojom.DoodleImageType.kAnimation,this.imageDoodle_.animationImpressionLogUrl);return}this.pageHandler_.onDoodleImageClicked(this.showAnimation_?newTabPage.mojom.DoodleImageType.kAnimation:newTabPage.mojom.DoodleImageType.kStatic,null);const onClickUrl=new URL(this.doodle_.image.onClickUrl.url);if(this.imageClickParams_){for(const param of new URLSearchParams(this.imageClickParams_)){onClickUrl.searchParams.append(param[0],param[1])}}WindowProxy.getInstance().open(onClickUrl.toString())}onImageLoad_(){this.logImageRendered_(this.isCtaImageShown_()?newTabPage.mojom.DoodleImageType.kCta:newTabPage.mojom.DoodleImageType.kStatic,this.imageDoodle_.imageImpressionLogUrl)}async logImageRendered_(type,logUrl){const{imageClickParams:imageClickParams,interactionLogUrl:interactionLogUrl,shareId:shareId}=await this.pageHandler_.onDoodleImageRendered(type,WindowProxy.getInstance().now(),logUrl);this.imageClickParams_=imageClickParams;this.interactionLogUrl_=interactionLogUrl;this.shareId_=shareId}onImageKeydown_(e){if([" ","Enter"].includes(e.key)){this.onImageClick_()}}onShare_(e){const doodleId=new URL(this.doodle_.image.onClickUrl.url).searchParams.get("ct");if(!doodleId){return}this.pageHandler_.onDoodleShared(e.detail,doodleId,this.shareId_)}isCtaImageShown_(){return!this.showAnimation_&&!!this.imageDoodle_.animationUrl}sendMode_(){const iframe=$$(this,"#iframe");if(this.dark===undefined||!iframe){return}iframe.postMessage({cmd:"changeMode",dark:this.dark})}onDarkChange_(){this.sendMode_()}computeImageUrl_(){return this.imageDoodle_?this.imageDoodle_.imageUrl.url:""}computeAnimationUrl_(){return this.imageDoodle_&&this.imageDoodle_.animationUrl?`chrome-untrusted://new-tab-page/image?${this.imageDoodle_.animationUrl.url}`:""}computeIframeUrl_(){if(this.doodle_&&this.doodle_.interactive){const url=new URL(this.doodle_.interactive.url.url);url.searchParams.append("theme_messages","0");return url.href}else{return""}}onShareButtonClick_(e){e.stopPropagation();this.showShareDialog_=true}onShareDialogClose_(){this.showShareDialog_=false}onDurationHeightWidthChange_(){this.updateStyles({"--duration":this.duration_,"--height":this.height_,"--width":this.width_})}}customElements.define(LogoElement.is,LogoElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleWrapperElement extends PolymerElement{static get is(){return"ntp-module-wrapper"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-module-wrapper">:host {
  background-color: var(--ntp-background-override-color);
    border: solid var(--ntp-border-color) 1px;
    border-radius: 5px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
    position: relative;
}

#impressionProbe {
  height: 27px;
    pointer-events: none;
    position: absolute;
    width: 100%;
}

#moduleElement {
  align-items: center;
    display: flex;
    justify-content: center;
}

</style>
<div id="impressionProbe"></div>
<div id="moduleElement"></div>
<!--_html_template_end_-->`}static get properties(){return{descriptor:{observer:"onDescriptorChange_",type:Object}}}onDescriptorChange_(newValue,oldValue){assert(!oldValue);this.$.moduleElement.appendChild(this.descriptor.element);this.descriptor.element.addEventListener("usage",(()=>{recordOccurence("NewTabPage.Modules.Usage");recordOccurence(`NewTabPage.Modules.Usage.${this.descriptor.id}`)}),{once:true});const headerObserver=new IntersectionObserver((([{intersectionRatio:intersectionRatio}])=>{if(intersectionRatio>=1){headerObserver.disconnect();const time=WindowProxy.getInstance().now();recordLoadDuration("NewTabPage.Modules.Impression",time);recordLoadDuration(`NewTabPage.Modules.Impression.${this.descriptor.id}`,time);this.dispatchEvent(new Event("detect-impression"))}}),{threshold:1});let intersectionPerdecage=0;const moduleObserver=new IntersectionObserver((([{intersectionRatio:intersectionRatio}])=>{intersectionPerdecage=Math.floor(Math.max(intersectionPerdecage,intersectionRatio*10))}),{threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]});window.addEventListener("unload",(()=>{recordPerdecage("NewTabPage.Modules.ImpressionRatio",intersectionPerdecage);recordPerdecage(`NewTabPage.Modules.ImpressionRatio.${this.descriptor.id}`,intersectionPerdecage)}));microTask.run((()=>{headerObserver.observe(this.$.impressionProbe);moduleObserver.observe(this)}));this.addEventListener("mouseover",(()=>{chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Hover",this.descriptor.id)}),{useCapture:true,once:true})}}customElements.define(ModuleWrapperElement.is,ModuleWrapperElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleHeaderElement extends PolymerElement{static get is(){return"ntp-module-header"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-icons" scope="ntp-module-header">:host {
  display: flex;
    flex-direction: column;
    margin: 16px;
}

#titleContainer {
  align-items: center;
    display: flex;
    height: 22px;
}

#title {
  color: var(--cr-primary-text-color);
    font-size: 15px;
}

#chip {
  background-color: var(--ntp-chip-background-color);
    border-radius: 4px;
    color: var(--ntp-chip-text-color);
    font-size: 10px;
    height: 12px;
    margin-inline-start: 10px;
    padding: 2px 6px;
}

#headerSpacer {
  flex-grow: 1;
}

cr-icon-button {
  --cr-icon-button-icon-size: 16px;
    margin-inline-end: -4px;
    margin-inline-start: 0;
}

#infoButton {
  --cr-icon-image: url(./icons/info.svg);
}

#menuButton {
  margin-inline-end: -10px;
}

#description {
  color: var(--cr-secondary-text-color);
    font-size: 12px;
    height: 12px;
    margin-top: 3px;
}

</style>
<div id="titleContainer">
  <span id="title"><slot></slot></span>
  <template is="dom-if" if="[[chipText]]">
    <div id="chip">[[chipText]]</div>
  </template>
  <div id="headerSpacer"></div>
  <template is="dom-if" if="[[showInfoButton]]">
    <cr-icon-button id="infoButton" title="Why am I seeing this?" on-click="onInfoButtonClick_">
    </cr-icon-button>
  </template>
  <cr-icon-button id="menuButton" title="More actions" class="icon-more-vert" on-click="onMenuButtonClick_">
  </cr-icon-button>
</div>
<template is="dom-if" if="[[descriptionText]]">
  <span id="description">[[descriptionText]]</span>
</template>
<cr-action-menu id="actionMenu">
  <template is="dom-if" if="[[showDismissButton]]">
    <button id="dismissButton" class="dropdown-item" on-click="onDismissButtonClick_">
      [[dismissText]]
    </button>
  </template>
  <button id="disableButton" class="dropdown-item" on-click="onDisableButtonClick_">
    [[disableText]]
  </button>
  <button id="customizeButton" class="dropdown-item" on-click="onCustomizeButtonClick_">
    Customize cards
  </button>
</cr-action-menu>
<!--_html_template_end_-->`}static get properties(){return{chipText:String,descriptionText:String,showInfoButton:{type:Boolean,value:false},showDismissButton:{type:Boolean,value:false},dismissText:String,disableText:String}}onInfoButtonClick_(){this.dispatchEvent(new Event("info-button-click",{bubbles:true}))}onMenuButtonClick_(e){this.$.actionMenu.showAt(e.target)}onDismissButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("dismiss-button-click",{bubbles:true}))}onDisableButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("disable-button-click",{bubbles:true}))}onCustomizeButtonClick_(){this.$.actionMenu.close();this.dispatchEvent(new Event("customize-module",{bubbles:true,composed:true}))}}customElements.define(ModuleHeaderElement.is,ModuleHeaderElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class ChromeCartModuleElement extends(mixinBehaviors([I18nBehavior],PolymerElement)){static get is(){return"ntp-chrome-cart-module"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style cr-icons" scope="ntp-chrome-cart-module">:host {
  display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    --discount-chip-background: rgb(230, 244, 234);
    --discount-chip-text-color: var(--google-green-700);
}

@media (prefers-color-scheme: dark) {
:host {
  --discount-chip-background: linear-gradient(0deg,
          rgba(129, 201, 149, 0.12), rgba(129, 201, 149, 0.12)), #202124;
      --discount-chip-text-color: rgb(129,201,149);
}

}

ntp-module-header {
  margin-bottom: 0;
}

:host(:hover) .side-scroll-button {
  visibility: visible;
}

#moduleContent {
  display: flex;
    height: 166px;
    padding-bottom: 16px;
    position: relative;
}

:host([header-description-text]) #moduleContent {
  height: 158px;
}

#cartCarousel {
  display: inline-block;
    overflow-x: hidden;
    padding-top: 24px;
    white-space: nowrap;
    z-index: 0;
}

:host([header-description-text]) #cartCarousel {
  padding-top: 16px;
}

#consentCard, .cart-item {
  border: 1px solid var(--ntp-border-color);
    border-radius: 4px;
    display: inline-flex;
    flex-direction: column;
    height: 140px;
    margin: 0 4px;
}

#consentCard {
  width: 244px;
}

#consentIconContainer {
  background: var(--discount-chip-background);
    border-radius: 4px;
    height: 24px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 16px;
    width: 24px;
}

#consentIcon {
  -webkit-mask-image: url(modules/cart/icons/consent_label.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--discount-chip-text-color);
    height: 15px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 4.5px;
    width: 15px;
}

#consentContent {
  color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: 400;
    height: 40px;
    line-height: 20px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 4px;
    text-align: center;
    white-space: normal;
    width: 220px;
}

#consentButtonContainer {
  display: inline-block;
    margin-inline-start: 16px;
    margin-top: 8px;
}

.discount-chip {
  background: var(--discount-chip-background);
    border-radius: 4px;
    color: var(--discount-chip-text-color);
    font-size: 12px;
    height: 24px;
    left: 50%;
    line-height: 24px;
    position: absolute;
    text-align: center;
    top: -18px;
    transform: translateX(-50%);
    width: 102px;
    z-index: 1;
}

.cart-item {
  outline: none;
    position: relative;
    text-decoration: none;
    width: 118px;
}

:host-context(.focus-outline-visible) .cart-item:focus {
  box-shadow: var(--ntp-focus-shadow);
}

.cart-title {
  color: var(--cr-primary-text-color);
    display: flex;
    flex-direction: row;
    font-size: 13px;
    height: 20px;
    justify-content: center;
    margin: 4px 8px 0 8px;
    text-align: center;
}

.cart-title .merchant {
  font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: var(--ntp-theme-text-shadow);
    white-space: nowrap;
}

.cart-title .item-count {
  color: var(--cr-secondary-text-color);
}

.favicon-image {
  border-radius: 2px;
    display: block;
    height: 24px;
    margin-inline-end: auto;
    margin-inline-start: auto;
    margin-top: 16px;
    width: 24px;
}

.thumbnail-container {
  margin-top: 4px;
    text-align: center;
    width: auto;
}

.thumbnail-container ul {
  list-style-type: none;
    margin-inline-end: 24px;
    padding: 0;
}

.thumbnail-container li {
  display: inline;
    margin-inline-end: -24px;
}

.thumbnail-img {
  border: 2px solid var(--ntp-background-override-color);
    border-radius: 50%;
    height: 44px;
    object-fit: cover;
    width: 44px;
}

.thumbnail-fallback {
  height: 48px;
    margin-top: 8px;
    position: relative;
    width: 102px;
}

:host-context([dir=rtl]) cr-icon-button {
  left: 0;
    right: unset;
}

.cart-item cr-icon-button {
  --cr-icon-button-icon-size: 16px;
    --cr-icon-button-size: 24px;
    margin: 4px 4px;
    position: absolute;
    right: 0;
    top: 2px;
}

.side-scroll-shadow {
  background-color: var(--ntp-background-override-color);
    display: flex;
    height: 160px;
    opacity: 0.38;
    pointer-events: none;
    position: absolute;
    width: 24px;
    z-index: 1;
}

#leftScrollShadow {
  left: 0;
}

#rightScrollShadow {
  right: 0;
}

.side-scroll-button {
  --cr-icon-button-fill-color: var(--ntp-icon-button-color);
    --cr-icon-button-icon-size: 16px;
    --cr-icon-button-margin-start: 0;
    --cr-icon-button-margin-end: 0;
    --cr-icon-image: url(icons/chevron.svg);
    background-color: var(--ntp-module-scroll-button-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    visibility: hidden;
    z-index: 2;
}

.side-scroll-button:hover {
  --cr-icon-button-fill-color: var(--ntp-icon-button-color-active);
    background-color: var(--ntp-module-scroll-button-hover-color);
}

#leftScrollButton {
  --cr-icon-image-transform: rotate(90deg);
    left: 0;
    margin-inline-start: 4px;
}

#rightScrollButton {
  --cr-icon-image-transform: rotate(270deg);
    margin-inline-end: 4px;
    right: 0;
}

.probe {
  display: inline-flex;
    width: 12px;
}

</style>
<ntp-module-header chip-text="[[headerChipText]]" description-text="[[headerDescriptionText]]" dismiss-text="[[i18nRecursive('',
                                  'modulesDismissButtonText',
                                  'modulesCartLowerThese')]]" disable-text="[[i18nRecursive('',
                                  'modulesDisableButtonText',
                                  'modulesCartLower')]]" show-dismiss-button="" on-dismiss-button-click="onDismissButtonClick_" on-disable-button-click="onDisableButtonClick_">
  Your carts
</ntp-module-header>
<div id="moduleContent">
  <template is="dom-if" if="[[showLeftScrollButton_]]">
    <div id="leftScrollShadow" class="side-scroll-shadow"></div>
    <cr-icon-button id="leftScrollButton" class="side-scroll-button" on-click="onLeftScrollClick_">
    </cr-icon-button>
  </template>
  <div id="cartCarousel">
    <div id="leftProbe" class="probe"></div>
    <template id="consentCardElement" is="dom-if" if="[[showDiscountConsent]]">
      <div id="consentCard">
        <div id="consentIconContainer">
          <div id="consentIcon"></div>
        </div>
        <span id="consentContent">
          Ask Google to find discounts on what youâ€™ve added to your carts?
        </span>
        <div id="consentButtonContainer">
          <cr-button id="cancelButton" class="cancel-button" on-click="onDisallowDiscount_" on-auxclick="onDisallowDiscount_">
            No thanks
          </cr-button>
          <cr-button id="actionButton" class="action-button" on-click="onAllowDiscount_" on-auxclick="onAllowDiscount_">
            Get discounts
          </cr-button>
        </div>
      </div>
    </template>
    <template id="cartItemRepeat" is="dom-repeat" items="[[cartItems]]">
      <a class="cart-item" title="[[item.merchant]]" href="[[item.cartUrl.url]]" on-click="onCartItemClick_" on-auxclick="onCartItemClick_">
        <template is="dom-if" if="[[item.discountText]]">
          <div class="discount-chip">[[item.discountText]]</div>
        </template>
        <cr-icon-button class="icon-more-vert" title="More actions" on-click="onCartMenuButtonClick_">
        </cr-icon-button>
        <img class="favicon-image" is="ntp-img" auto-src="[[getFaviconUrl_(item.cartUrl.url)]]">
        <div class="cart-title">
          <span class="merchant">[[item.merchant]]</span>
          <template is="dom-if" if="[[item.productImageUrls.length]]">
            <span class="item-count">
              &nbsp;â€¢&nbsp;[[item.productImageUrls.length]]
            </span>
          </template>
        </div>
        <div class="thumbnail-container">
          <template is="dom-if" if="[[item.productImageUrls.length]]">
            <ul class="thumbnail-list">
              <template is="dom-repeat" items="[[getImagesToShow_(item.productImageUrls)]]">
                <li>
                  <img class="thumbnail-img" is="ntp-img" auto-src="[[item.url]]">
                </li>
              </template>
            </ul>
          </template>
          <template id="thumbnailFallback" is="dom-if" if="[[!item.productImageUrls.length]]">
            <img class="thumbnail-fallback" src="modules/cart/icons/cart_fallback.svg">
          </template>
        </div>
      </a>
    </template>
    <div id="rightProbe" class="probe"></div>
  </div>
  <cr-action-menu id="cartActionMenu">
    <button id="hideCartButton" class="dropdown-item" on-click="onCartHide_">
      [[cartMenuHideItem_]]
    </button>
    <button id="removeCartButton" class="dropdown-item" on-click="onCartRemove_">
      [[cartMenuRemoveItem_]]
    </button>
  </cr-action-menu>
  <template is="dom-if" if="[[showRightScrollButton_]]">
    <div id="rightScrollShadow" class="side-scroll-shadow"> </div>
    <cr-icon-button id="rightScrollButton" class="side-scroll-button" on-click="onRightScrollClick_">
    </cr-icon-button>
  </template>
</div>
<cr-toast id="dismissCartToast" duration="10000">
  <div id="dismissCartToastMessage">
    [[dismissedCartData_.message]]
  </div>
  <cr-button id="undoDismissCartButton" on-click="onUndoDismissCartButtonClick_">
    Undo
  </cr-button>
</cr-toast>
<cr-toast id="confirmDiscountConsentToast" duration="10000">
  <div id="confirmDiscountConsentMessage">
    [[confirmDiscountConsentString_]]
  </div>
  <cr-button id="confirmDiscountConsentButton" on-click="onConfirmDiscountConsentClick_">
    Got it
  </cr-button>
</cr-toast>
<!--_html_template_end_-->`}static get properties(){return{cartItems:Array,headerChipText:String,headerDescriptionText:{type:String,reflectToAttribute:true},showDiscountConsent:Boolean,showLeftScrollButton_:Boolean,showRightScrollButton_:Boolean,cartMenuHideItem_:String,cartMenuRemoveItem_:String,dismissedCartData_:{type:Object,value:null},confirmDiscountConsentString_:String,discountConsentIconSrc_:String}}constructor(){super();this.intersectionObserver_=null;this.scrollBehavior="smooth";this.currentMenuIndex_=0}connectedCallback(){super.connectedCallback();const leftProbe=this.$.cartCarousel.querySelector("#leftProbe");const rightProbe=this.$.cartCarousel.querySelector("#rightProbe");this.intersectionObserver_=new IntersectionObserver((entries=>{entries.forEach((({target:target,intersectionRatio:intersectionRatio})=>{const show=intersectionRatio===0;if(target===leftProbe){this.showLeftScrollButton_=show;if(show){this.dispatchEvent(new Event("left-scroll-show"))}else{this.dispatchEvent(new Event("left-scroll-hide"))}}else if(target===rightProbe){this.showRightScrollButton_=show;if(show){this.dispatchEvent(new Event("right-scroll-show"))}else{this.dispatchEvent(new Event("right-scroll-hide"))}}}))}),{root:this.$.cartCarousel});this.shadowRoot.querySelectorAll(".probe").forEach((el=>this.intersectionObserver_.observe(el)))}disconnectedCallback(){super.disconnectedCallback();this.intersectionObserver_.disconnect()}getFaviconUrl_(url){const faviconUrl=new URL("chrome://favicon2/");faviconUrl.searchParams.set("size","24");faviconUrl.searchParams.set("scale_factor","1x");faviconUrl.searchParams.set("show_fallback_monogram","");faviconUrl.searchParams.set("page_url",url);return faviconUrl.href}getImagesToShow_(imageUrls){return imageUrls.slice(0,3)}onCartMenuButtonClick_(e){e.preventDefault();this.currentMenuIndex_=this.$.cartItemRepeat.indexForElement(e.target.parentElement);const merchant=this.cartItems[this.currentMenuIndex_].merchant;this.cartMenuHideItem_=loadTimeData.getStringF("modulesCartCartMenuHideMerchant",merchant);this.cartMenuRemoveItem_=loadTimeData.getStringF("modulesCartCartMenuRemoveMerchant",merchant);this.$.cartActionMenu.showAt(e.target)}async onCartHide_(){this.$.cartActionMenu.close();const merchant=this.cartItems[this.currentMenuIndex_].merchant;const cartUrl=this.cartItems[this.currentMenuIndex_].cartUrl;await ChromeCartProxy.getInstance().handler.hideCart(cartUrl);this.resetCartData_();this.dismissedCartData_={message:loadTimeData.getStringF("modulesCartCartMenuHideMerchantToastMessage",merchant),restoreCallback:async()=>{await ChromeCartProxy.getInstance().handler.restoreHiddenCart(cartUrl)}};$$(this,"#dismissCartToast").show()}async onCartRemove_(){this.$.cartActionMenu.close();const merchant=this.cartItems[this.currentMenuIndex_].merchant;const cartUrl=this.cartItems[this.currentMenuIndex_].cartUrl;await ChromeCartProxy.getInstance().handler.removeCart(cartUrl);this.resetCartData_();this.dismissedCartData_={message:loadTimeData.getStringF("modulesCartCartMenuRemoveMerchantToastMessage",merchant),restoreCallback:async()=>{await ChromeCartProxy.getInstance().handler.restoreRemovedCart(cartUrl)}};$$(this,"#dismissCartToast").show()}async onUndoDismissCartButtonClick_(){await this.dismissedCartData_.restoreCallback();this.resetCartData_();$$(this,"#dismissCartToast").hide();this.dismissedCartData_=null}async resetCartData_(){const{carts:carts}=await ChromeCartProxy.getInstance().handler.getMerchantCarts();this.cartItems=carts}onDismissButtonClick_(){ChromeCartProxy.getInstance().handler.hideCartModule();this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getString("modulesCartModuleMenuHideToastMessage"),restoreCallback:()=>{ChromeCartProxy.getInstance().handler.restoreHiddenCartModule();chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.UndoHideModule")}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.HideModule")}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesCartLowerYour")),restoreCallback:()=>{chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.UndoRemoveModule")}}}));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RemoveModule")}onRightScrollClick_(){const carts=this.$.cartCarousel.querySelectorAll(".cart-item");let lastVisibleIndex=0;for(let i=0;i<carts.length;i++){if(this.getVisibilityForIndex_(i)){lastVisibleIndex=i}}this.scrollToIndex_(lastVisibleIndex+1);chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.RightScrollClick")}onLeftScrollClick_(){const carts=this.$.cartCarousel.querySelectorAll(".cart-item");let visibleRange=0,firstVisibleIndex=0;for(let i=carts.length-1;i>=0;i--){if(this.getVisibilityForIndex_(i)){visibleRange+=1;firstVisibleIndex=i}}this.scrollToIndex_(Math.max(0,firstVisibleIndex-visibleRange));chrome.metricsPrivate.recordUserAction("NewTabPage.Carts.LeftScrollClick")}scrollToIndex_(index){const carts=this.$.cartCarousel.querySelectorAll(".cart-item");const leftScrollShadow=this.shadowRoot.getElementById("leftScrollShadow");const rightScrollShadow=this.shadowRoot.getElementById("rightScrollShadow");const scrollOffset=Math.max(leftScrollShadow?leftScrollShadow.offsetWidth:0,rightScrollShadow?rightScrollShadow.offsetWidth:0);let leftPosition=carts[index].offsetLeft-scrollOffset;if(index===0){const consentCard=this.shadowRoot.getElementById("consentCard");if(consentCard){leftPosition-=consentCard.offsetWidth}}this.$.cartCarousel.scrollTo({top:0,left:leftPosition,behavior:this.scrollBehavior})}getVisibilityForIndex_(index){const cartCarousel=this.$.cartCarousel;const cart=cartCarousel.querySelectorAll(".cart-item")[index];return cart&&cart.offsetLeft>cartCarousel.scrollLeft&&cartCarousel.scrollLeft+cartCarousel.clientWidth>cart.offsetLeft+cart.offsetWidth}onCartItemClick_(e){const index=this.$.cartItemRepeat.indexForElement(e.target);ChromeCartProxy.getInstance().handler.onCartItemClicked(index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onDisallowDiscount_(){this.showDiscountConsent=false;this.confirmDiscountConsentString_=loadTimeData.getString("modulesCartDiscountConsentRejectConfirmation");$$(this,"#confirmDiscountConsentToast").show();ChromeCartProxy.getInstance().handler.onDiscountConsentAcknowledged(false)}onAllowDiscount_(){this.showDiscountConsent=false;this.confirmDiscountConsentString_=loadTimeData.getString("modulesCartDiscountConsentAcceptConfirmation");$$(this,"#confirmDiscountConsentToast").show();ChromeCartProxy.getInstance().handler.onDiscountConsentAcknowledged(true)}onConfirmDiscountConsentClick_(){$$(this,"#confirmDiscountConsentToast").hide()}}customElements.define(ChromeCartModuleElement.is,ChromeCartModuleElement);async function createCartElement(){const{welcomeVisible:welcomeVisible}=await ChromeCartProxy.getInstance().handler.getWarmWelcomeVisible();const{carts:carts}=await ChromeCartProxy.getInstance().handler.getMerchantCarts();const{consentVisible:consentVisible}=await ChromeCartProxy.getInstance().handler.getDiscountConsentCardVisible();ChromeCartProxy.getInstance().handler.onModuleCreated(carts.length);if(carts.length===0){return null}const element=new ChromeCartModuleElement;if(welcomeVisible){element.headerChipText=loadTimeData.getString("modulesCartHeaderNew");element.headerDescriptionText=loadTimeData.getString("modulesCartWarmWelcome")}element.cartItems=carts;element.showDiscountConsent=consentVisible;return element}const chromeCartDescriptor=new ModuleDescriptor("chrome_cart",loadTimeData.getString("modulesCartSentence"),createCartElement);// Copyright 2021 The Chromium Authors. All rights reserved.
let instance$1=null;class DriveProxy{static getInstance(){return instance$1||(instance$1=new DriveProxy)}static setInstance(newInstance){instance$1=newInstance}constructor(){this.handler=drive.mojom.DriveHandler.getRemote()}}// Copyright 2020 The Chromium Authors. All rights reserved.
class DriveModuleElement extends(mixinBehaviors([I18nBehavior],PolymerElement)){static get is(){return"ntp-drive-module"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-drive-module">:host {
  --ntp-modules-drive-row-margin: 15px;
    display: block;
    height: 100%;
    width: 100%;
}

#files {
  display: flex;
    flex-direction: column;
}

.file {
  align-items: center;
    border-top: 0.5px solid var(--ntp-border-color);
    color: var(--cr-primary-text-color);
    display: flex;
    flex-shrink: 0;
    height: 38px;
    margin-inline-end: var(--ntp-modules-drive-row-margin);
    margin-inline-start: var(--ntp-modules-drive-row-margin);
    text-decoration: none;
}

.file:hover {
  background-color: var(--ntp-hover-background-color);
    margin-inline-end: 0;
    margin-inline-start: 0;
    padding-inline-end: var(--ntp-modules-drive-row-margin);
    padding-inline-start: var(--ntp-modules-drive-row-margin);
}

.file:hover + .file {
  margin-inline-end: 0;
    margin-inline-start: 0;
    padding-inline-end: var(--ntp-modules-drive-row-margin);
    padding-inline-start: var(--ntp-modules-drive-row-margin);
}

.file-icon {
  margin-inline-end: 8px;
}

.file-title {
  flex-basis: 0;
    flex-grow: 250;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.file-description {
  color: var(--cr-secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.file-info {
  display: flex;
}

.justification-container {
  align-items: center;
    display: flex;
    flex-basis: 0;
    flex-grow: 186;
    overflow: hidden;
}

.user-image {
  border-radius: 50%;
    margin-inline-end: 8px;
    max-height: 30px;
}

</style>
<ntp-module-header disable-text="[[i18nRecursive('',
                                  'modulesDisableButtonText',
                                  'modulesDriveSentence')]]" on-disable-button-click="onDisableButtonClick_">
  From Google Drive
</ntp-module-header>
<div id="files">
  <template id="fileRepeat" is="dom-repeat" items="[[files]]">
    <a class="file" href="[[item.itemUrl.url]]" on-click="onFileClick_" on-auxclick="onFileClick_">
      <img is="ntp-img" class="file-icon" draggable="false" auto-src="[[getImageSrc_(item)]]">
      
      <div class="file-title" title="[[item.title]]">[[item.title]]</div>
      <div class="justification-container">
        <template is="dom-if" if="[[item.untrustedPhotoUrl]]">
          <img is="ntp-img" class="user-image" draggable="false" auto-src="[[item.untrustedPhotoUrl.url]]">
          
        </template>
        <div class="file-description">[[item.justificationText]]</div>
      </div>
    </a>
  </template>
</div>
<!--_html_template_end_-->`}static get properties(){return{files:Array}}constructor(){super();this.intersectionObserver_=null}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",loadTimeData.getString("modulesDriveSentence"))}}))}getImageSrc_(file){return"https://drive-thirdparty.googleusercontent.com/16/type/"+file.mimeType}onFileClick_(e){this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}));const index=this.$.fileRepeat.indexForElement(e.target);chrome.metricsPrivate.recordSmallCount("NewTabPage.Drive.FileClick",index)}}customElements.define(DriveModuleElement.is,DriveModuleElement);async function createDriveElement(){const{files:files}=await DriveProxy.getInstance().handler.getFiles();if(files.length===0){return null}const element=new DriveModuleElement;element.files=files;return element}const driveDescriptor=new ModuleDescriptor("drive",loadTimeData.getString("modulesDriveSentence"),createDriveElement);// Copyright 2020 The Chromium Authors. All rights reserved.
let instance$2=null;class TaskModuleHandlerProxy{static getInstance(){return instance$2||(instance$2=new TaskModuleHandlerProxy)}static setInstance(newInstance){instance$2=newInstance}constructor(){this.handler=taskModule.mojom.TaskModuleHandler.getRemote()}}// Copyright 2020 The Chromium Authors. All rights reserved.
class TaskModuleElement extends(mixinBehaviors([I18nBehavior],PolymerElement)){static get is(){return"ntp-task-module"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="ntp-task-module">:host {
  display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

#moduleContent {
  box-sizing: border-box;
    display: block;
    flex-grow: 1;
    padding-bottom: 15px;
    padding-inline-end: 15px;
    padding-inline-start: 15px;
    width: 100%;
}

#taskItems {
  display: flex;
    flex-direction: row;
}

.task-item {
  border-radius: 4px;
    display: flex;
    flex-direction: column;
    outline: none;
    position: relative;
    text-decoration: none;
}

:host([shopping]) .task-item {
  width: 120px;
}

:host([recipe]) .task-item {
  width: 165px;
}

:host-context(.focus-outline-visible) .task-item:focus {
  box-shadow: var(--ntp-focus-shadow);
}

.task-item:not([hidden]) + .task-item {
  margin-inline-start: 16px;
}

.image-background {
  background-color: rgb(22, 55, 88);
    border-radius: 4px;
    height: 120px;
    margin-bottom: 8px;
    width: inherit;
}

.image-container {
  background-color: white;
    border-radius: 4px;
    
    box-shadow: 0 0 0 0.2px white;
    box-sizing: border-box;
    height: 100%;
    opacity: 97%;
    padding: 10px;
}

:host([shopping]) img {
  height: 100%;
    object-fit: contain;
    width: 100%;
}

:host([recipe]) img {
  border-radius: 4px;
    height: 136px;
    margin-bottom: 8px;
    object-fit: cover;
    width: inherit;
}

.tag {
  background: rgba(var(--ntp-background-override-color-rgb), .9);
    border-radius: 4px;
    color: var(--cr-primary-text-color);
    font-size: 9px;
    margin: 8px;
    padding:  8px;
    position: absolute;
    text-transform: uppercase;
}

:host-context([dir=rtl]) .tag {
  right: 0;
}

.price {
  color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: bold;
    height: 14px;
    line-height: 15px;
    margin-bottom: 8px;
}

.name {
  color: var(--cr-primary-text-color);
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 4px;
    overflow: hidden;
}

:host([shopping]) .name {
  -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    height: 40px;
}

:host([recipe]) .name {
  text-overflow: ellipsis;
    white-space: nowrap;
}

.secondary {
  color: var(--cr-secondary-text-color);
    font-size: 11px;
    height: 13px;
    text-overflow: ellipsis;
}

#relatedSearches {
  display: flex;
    flex-direction: row;
    margin-top: 16px;
}

.pill {
  align-items: center;
    border: solid var(--ntp-border-color) 1px;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    height: 32px;
    outline: none;
    text-decoration: none;
}

.pill:hover {
  background-color: var(--ntp-hover-background-color);
}

.pill:active {
  background-color: var(--ntp-active-background-color);
}

:host-context(.focus-outline-visible) .pill:focus {
  box-shadow: var(--ntp-focus-shadow);
}

.pill + .pill {
  margin-inline-start: 8px;
}

.loupe {
  -webkit-mask-image: url(search.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-secondary-text-color);
    height: 16px;
    margin-inline-start: 12px;
    width: 16px;
}

.search-text {
  color: var(--cr-primary-text-color);
    font-size: 13px;
    margin-inline-end: 12px;
    margin-inline-start: 8px;
}

cr-dialog::part(dialog) {
  position: fixed;
    width: 459px;
}

cr-dialog [slot='body'] div:not(:last-of-type) {
  margin-bottom: 24px;
}

cr-dialog [slot='body'] a[href] {
  color: var(--cr-link-color);
    text-decoration: none;
}

</style>
<ntp-module-header dismiss-text="[[i18n('modulesDismissButtonText', dismissName_)]]" disable-text="[[i18n('modulesDisableButtonText', disableName_)]]" show-info-button="" on-info-button-click="onInfoButtonClick_" show-dismiss-button="" on-dismiss-button-click="onDismissButtonClick_" on-disable-button-click="onDisableButtonClick_">
  [[task.title]]
</ntp-module-header>
<div id="moduleContent">
  <div id="taskItems">
    <template is="dom-repeat" id="taskItemsRepeat" items="[[task.taskItems]]" on-dom-change="onDomChange_">
      <a class="task-item" href="[[item.targetUrl.url]]" on-click="onTaskItemClick_" on-auxclick="onTaskItemClick_">
        <template is="dom-if" if="[[isShopping_(taskModuleType)]]">
          <div class="image-background">
            <div class="image-container">
              <img is="ntp-img" auto-src="[[item.imageUrl.url]]" draggable="false">
            </div>
          </div>
          <div class="price" hidden$="[[!item.price]]">[[item.price]]</div>
          <div class="name" title="[[item.name]]">[[item.name]]</div>
          <div class="secondary">[[item.info]]</div>
        </template>
        <template is="dom-if" if="[[isRecipe_(taskModuleType)]]">
          <img is="ntp-img" auto-src="[[item.imageUrl.url]]" draggable="false">
          
          <div class="tag">[[item.info]]</div>
          <div class="name" title="[[item.name]]">[[item.name]]</div>
          <div class="secondary">[[item.siteName]]</div>
        </template>
      </a>
    </template>
  </div>
  <div id="relatedSearches">
    <template is="dom-repeat" id="relatedSearchesRepeat" items="[[task.relatedSearches]]" on-dom-change="onDomChange_">
      <a class="pill" href="[[item.targetUrl.url]]" on-click="onPillClick_" on-auxclick="onPillClick_">
        <div class="loupe"></div>
        <div class="search-text">[[item.text]]</div>
      </a>
    </template>
  </div>
</div>
<template is="dom-if" if="[[showInfoDialog]]" restamp="">
  <cr-dialog show-on-attach="">
    <div slot="title">Why am I seeing this?</div>
    <div slot="body">
      <div>You're seeing this item based on your previous activity using Google services. You can see your data, delete it, and change your settings at <a href="https://myactivity.google.com/" target="_blank">myactivity.google.com</a>.</div>
      <div>Learn about the data Google collects and why at <a href="https://policies.google.com/" target="_blank">policies.google.com</a>.</div>
    </div>
    <div slot="button-container">
      <cr-button class="action-button" on-click="onCloseClick_">
        Close
      </cr-button>
    </div>
  </cr-dialog>
</template>
<!--_html_template_end_-->`}static get properties(){return{taskModuleType:{type:Number,observer:"onTaskModuleTypeChange_"},task:Object,showInfoDialog:Boolean,dismissName_:{type:String,computed:"computeDismissName_(taskModuleType, task)"},disableName_:{type:String,computed:"computeDisableName_(taskModuleType)"}}}constructor(){super();this.intersectionObserver_=null}computeDismissName_(){switch(this.taskModuleType){case taskModule.mojom.TaskModuleType.kRecipe:return loadTimeData.getString("modulesRecipeTasksLowerThese");case taskModule.mojom.TaskModuleType.kShopping:return this.task.name;default:return""}}computeDisableName_(){switch(this.taskModuleType){case taskModule.mojom.TaskModuleType.kRecipe:return loadTimeData.getString("modulesRecipeTasksLower");case taskModule.mojom.TaskModuleType.kShopping:return loadTimeData.getString("modulesShoppingTasksLower");default:return""}}isRecipe_(){return this.taskModuleType===taskModule.mojom.TaskModuleType.kRecipe}isShopping_(){return this.taskModuleType===taskModule.mojom.TaskModuleType.kShopping}onTaskModuleTypeChange_(){switch(this.taskModuleType){case taskModule.mojom.TaskModuleType.kRecipe:this.toggleAttribute("recipe");break;case taskModule.mojom.TaskModuleType.kShopping:this.toggleAttribute("shopping");break}}onTaskItemClick_(e){const index=this.$.taskItemsRepeat.indexForElement(e.target);TaskModuleHandlerProxy.getInstance().handler.onTaskItemClicked(this.taskModuleType,index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onPillClick_(e){const index=this.$.relatedSearchesRepeat.indexForElement(e.target);TaskModuleHandlerProxy.getInstance().handler.onRelatedSearchClicked(this.taskModuleType,index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onInfoButtonClick_(){this.showInfoDialog=true}onCloseClick_(){this.showInfoDialog=false}onDismissButtonClick_(){TaskModuleHandlerProxy.getInstance().handler.dismissTask(this.taskModuleType,this.task.name);let taskName="";switch(this.taskModuleType){case taskModule.mojom.TaskModuleType.kRecipe:taskName=loadTimeData.getString("modulesRecipeTasksSentence");break;case taskModule.mojom.TaskModuleType.kShopping:taskName=this.task.name;break}this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("dismissModuleToastMessage",taskName),restoreCallback:this.onRestore_.bind(this)}}))}onDisableButtonClick_(){this.dispatchEvent(new CustomEvent("disable-module",{bubbles:true,composed:true,detail:{message:loadTimeData.getStringF("disableModuleToastMessage",this.disableName_)}}))}onRestore_(){TaskModuleHandlerProxy.getInstance().handler.restoreTask(this.taskModuleType,this.task.name)}onDomChange_(){if(!this.intersectionObserver_){this.intersectionObserver_=new IntersectionObserver((entries=>{entries.forEach((({intersectionRatio:intersectionRatio,target:target})=>{target.style.visibility=intersectionRatio<1?"hidden":"visible"}));this.dispatchEvent(new Event("visibility-update"))}),{root:this,threshold:1})}else{this.intersectionObserver_.disconnect()}this.shadowRoot.querySelectorAll(".task-item, .pill").forEach((el=>this.intersectionObserver_.observe(el)))}}customElements.define(TaskModuleElement.is,TaskModuleElement);async function createModule(taskModuleType){const{task:task}=await TaskModuleHandlerProxy.getInstance().handler.getPrimaryTask(taskModuleType);if(!task){return null}const element=new TaskModuleElement;element.taskModuleType=taskModuleType;element.task=task;return element}const recipeTasksDescriptor=new ModuleDescriptor("recipe_tasks",loadTimeData.getString("modulesRecipeTasksSentence"),createModule.bind(null,taskModule.mojom.TaskModuleType.kRecipe));const shoppingTasksDescriptor=new ModuleDescriptor("shopping_tasks",loadTimeData.getString("modulesShoppingTasksSentence"),createModule.bind(null,taskModule.mojom.TaskModuleType.kShopping));// Copyright 2020 The Chromium Authors. All rights reserved.
const descriptors=[];if(loadTimeData.getBoolean("shoppingTasksModuleEnabled")){descriptors.push(shoppingTasksDescriptor)}if(loadTimeData.getBoolean("recipeTasksModuleEnabled")){descriptors.push(recipeTasksDescriptor)}if(loadTimeData.getBoolean("chromeCartModuleEnabled")){descriptors.push(chromeCartDescriptor)}if(loadTimeData.getBoolean("driveModuleEnabled")){descriptors.push(driveDescriptor)}ModuleRegistry.getInstance().registerModules(descriptors);// Copyright 2016 The Chromium Authors. All rights reserved.
var PromiseResolver=class{constructor(){this.resolve_;this.reject_;this.isFulfilled_=false;this.promise_=new Promise(((resolve,reject)=>{this.resolve_=resolution=>{resolve(resolution);this.isFulfilled_=true};this.reject_=reason=>{reject(reason);this.isFulfilled_=true}}))}get isFulfilled(){return this.isFulfilled_}set isFulfilled(i){assertNotReached()}get promise(){return this.promise_}set promise(p){assertNotReached()}get resolve(){return this.resolve_}set resolve(r){assertNotReached()}get reject(){return this.reject_}set reject(s){assertNotReached()}};// Copyright 2020 The Chromium Authors. All rights reserved.
class LoadTimeResolver{constructor(url){this.resolver_=new PromiseResolver;this.eventTracker_=new EventTracker;this.eventTracker_.add(window,"message",(({data:data})=>{if(data.frameType==="background-image"&&data.messageType==="loaded"&&url===data.url){this.resolve_(data.time)}}))}get promise(){return this.resolver_.promise}reject(){this.resolver_.reject();this.eventTracker_.removeAll()}resolve_(loadTime){this.resolver_.resolve(loadTime);this.eventTracker_.removeAll()}}let instance$3=null;class BackgroundManager{static getInstance(){return instance$3||(instance$3=new BackgroundManager)}static setInstance(newInstance){instance$3=newInstance}constructor(){this.backgroundImage_=strictQuery(document.body,"#backgroundImage",HTMLIFrameElement);this.loadTimeResolver_=null;this.url_=this.backgroundImage_.src}setShowBackgroundImage(show){document.body.toggleAttribute("show-background-image",show)}setBackgroundColor(color){document.body.style.backgroundColor=skColorToRgba(color)}setBackgroundImage(image){const url=new URL("chrome-untrusted://new-tab-page/custom_background_image");url.searchParams.append("url",image.url.url);if(image.url2x){url.searchParams.append("url2x",image.url2x.url)}if(image.size){url.searchParams.append("size",image.size)}if(image.repeatX){url.searchParams.append("repeatX",image.repeatX)}if(image.repeatY){url.searchParams.append("repeatY",image.repeatY)}if(image.positionX){url.searchParams.append("positionX",image.positionX)}if(image.positionY){url.searchParams.append("positionY",image.positionY)}if(url.href===this.url_){return}if(this.loadTimeResolver_){this.loadTimeResolver_.reject();this.loadTimeResolver_=null}this.backgroundImage_.contentWindow.location.replace(url.href);this.url_=url.href}getBackgroundImageLoadTime(){if(!this.loadTimeResolver_){this.loadTimeResolver_=new LoadTimeResolver(this.backgroundImage_.src);WindowProxy.getInstance().postMessage(this.backgroundImage_,"sendLoadTime","chrome-untrusted://new-tab-page")}return this.loadTimeResolver_.promise}}// Copyright 2019 The Chromium Authors. All rights reserved.
function ensureLazyLoaded(){const script=document.createElement("script");script.type="module";script.src="./lazy_load.js";document.body.appendChild(script)}class AppElement extends PolymerElement{static get is(){return"ntp-app"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="ntp-app">:host {
  --ntp-theme-shortcut-background-color: rgb(229, 231, 232);
    --ntp-theme-text-color: var(--google-grey-800);
    --ntp-theme-text-shadow: none;
    --ntp-one-google-bar-height: 56px;
    --ntp-search-box-width: 337px;
}

@media (min-width: 560px) {
:host {
  --ntp-search-box-width: 449px;
}

}

@media (min-width: 672px) {
:host {
  --ntp-search-box-width: 561px;
}

}

@media (prefers-color-scheme: dark) {
:host {
  --ntp-theme-shortcut-background-color: var(--google-grey-refresh-100);
      --ntp-theme-text-color: white;
}

}

:host([show-background-image_]) {
  --ntp-theme-text-shadow: 0 0 16px rgba(0, 0, 0, .3);
}

#oneGoogleBar {
  height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
}

#oneGoogleBarOverlayBackdrop {
  background: rgba(0, 0, 0, .6);
    display: none;
    height: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
}

#oneGoogleBarOverlayBackdrop[show] {
  display: block;
}

#content {
  align-items: center;
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--ntp-one-google-bar-height));
    min-width: fit-content;  
    position: relative;
    z-index: 1;
}

:host([iframe-one-google-bar-enabled_]) #content {
  padding-top: var(--ntp-one-google-bar-height);
}

#logo {
  margin-bottom: 38px;
    z-index: 1;
}

ntp-realbox {
  margin-bottom: 16px;
}

ntp-realbox, ntp-module-wrapper {
  flex-shrink: 0;
    width: var(--ntp-search-box-width);
}

ntp-realbox {
  visibility: hidden;
}

ntp-realbox[shown] {
  visibility: visible;
}

ntp-most-visited[dark] {
  --icon-button-color-active: var(--google-grey-refresh-300);
    --icon-button-color: white;
    --tile-hover-color: rgba(255, 255, 255, .1);
}

ntp-middle-slot-promo:not([hidden]) ~ ntp-module-wrapper, ntp-module-wrapper + ntp-module-wrapper {
  margin-top: 16px;
}

:host(:not([promo-and-modules-loaded_])) ntp-middle-slot-promo, :host(:not([promo-and-modules-loaded_])) ntp-module-wrapper {
  display: none;
}

#customizeButtonContainer {
  background-color: var(--ntp-background-override-color);
    border-radius: calc(.5 * var(--cr-button-height));
    bottom: 16px;
    position: fixed;
}

:host-context([dir='ltr']) #customizeButtonContainer {
  right: 16px;
}

:host-context([dir='rtl']) #customizeButtonContainer {
  left: 16px;
}

:host([show-background-image_]) #customizeButtonContainer {
  background-color: transparent;
}

:host([show-background-image_]) #customizeButtonContainer:hover {
  background-color: rgba(255, 255, 255, .1);
}

#customizeButton {
  border: none;
    border-radius: calc(.5 * var(--cr-button-height));
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 1px 2px rgba(0, 0, 0, .23);
    font-weight: 400;
    min-width: 32px;
}

:host([show-background-image_]) #customizeButton {
  box-shadow: none;
    padding: 0;
}

:host-context(.focus-outline-visible) #customizeButton:focus {
  box-shadow: var(--ntp-focus-shadow);
}

#customizeIcon {
  -webkit-mask-image: url(icons/icon_pencil.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--text-color);
    height: 16px;
    margin-inline-end: 8px;
    width: 16px;
}

:host([show-background-image_]) #customizeIcon {
  background-color: white;
    margin: 0;
}

@media (max-width: 550px) {
#customizeButton {
  padding: 0;
}

#customizeIcon {
  margin: 0;
}

#customizeText {
  display: none;
}

}

#themeAttribution {
  align-self: flex-start;
    bottom: 16px;
    color: var(--cr-secondary-text-color);
    margin-inline-start: 16px;
    position: fixed;
}

#backgroundImageAttribution {
  border-radius: 8px;
    bottom: 16px;
    color: var(--ntp-theme-text-color);
    line-height: 20px;
    max-width: 50vw;
    padding: 8px;
    position: fixed;
    text-shadow: var(--ntp-theme-text-shadow);
    z-index: -1;
}

:host-context([dir='ltr']) #backgroundImageAttribution {
  left: 16px;
}

:host-context([dir='rtl']) #backgroundImageAttribution {
  right: 16px;
}

#backgroundImageAttribution:hover {
  background: rgba(var(--google-grey-900-rgb), .1);
}

#backgroundImageAttribution1Container {
  align-items: center;
    display: flex;
    flex-direction: row;
}

#linkIcon {
  -webkit-mask-image: url(icons/link.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--ntp-theme-text-color);
    height: 16px;
    margin-inline-end: 8px;
    width: 16px;
}

#backgroundImageAttribution1, #backgroundImageAttribution2 {
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#backgroundImageAttribution1 {
  font-size: .875rem;
}

#backgroundImageAttribution2 {
  font-size: .75rem;
}

#contentBottomSpacer {
  flex-shrink: 0;
    height: 32px;
    width: 1px;
}

svg {
  position: fixed;
}

</style>
<div id="content" style="--ntp-theme-text-color: [[rgbaOrInherit_(theme_.shortcutTextColor)]];
        --ntp-theme-shortcut-background-color:
              [[rgbaOrInherit_(theme_.shortcutBackgroundColor)]];
        --ntp-logo-color: [[rgbaOrInherit_(logoColor_)]];">
  <template is="dom-if" if="[[showIframedOneGoogleBar_]]">
    <ntp-iframe id="oneGoogleBar" src="[[oneGoogleBarIframePath_]]" hidden$="[[!oneGoogleBarLoaded_]]">
    </ntp-iframe>
  </template>
  <!-- TODO(crbug.com/1168361): Instead of hidden$="[[!logoEnabled_]]" it would
       be nicer to use a dom-if. However, that breaks
       StartupBrowserCreatorPickerNoParamsTest.ShowPickerWhenAlreadyLaunched on
       the msan builder. See crbug.com/1169070. -->
  <ntp-logo id="logo" single-colored$="[[singleColoredLogo_]]" dark="[[theme_.isDark]]" background-color="[[backgroundColor_]]" hidden$="[[!logoEnabled_]]">
  </ntp-logo>
  <ntp-realbox id="realbox" on-open-voice-search="onOpenVoiceSearch_" theme="[[theme_.searchBox]]" shown$="[[realboxShown_]]">
  </ntp-realbox>
  <dom-if if="[[lazyRender_]]" on-dom-change="onLazyRendered_">
    <template>
      <template is="dom-if" if="[[shortcutsEnabled_]]">
        <ntp-most-visited id="mostVisited" dark$="[[theme_.isDark]]" use-white-add-icon$="[[theme_.shortcutUseWhiteAddIcon]]" use-title-pill$="[[theme_.shortcutUseTitlePill]]">
        </ntp-most-visited>
      </template>
      <template is="dom-if" if="[[middleSlotPromoEnabled_]]">
        <ntp-middle-slot-promo on-ntp-middle-slot-promo-loaded="onMiddleSlotPromoLoaded_">
        </ntp-middle-slot-promo>
      </template>
      <template is="dom-repeat" items="[[moduleDescriptors_]]" id="modules" on-dom-change="onModulesLoaded_">
        <ntp-module-wrapper descriptor="[[item]]" on-dismiss-module="onDismissModule_" on-disable-module="onDisableModule_" on-customize-module="onCustomizeModule_" hidden="[[moduleDisabled_(item.id,
                                      dismissedModules_.*,
                                      disabledModules_)]]">
        </ntp-module-wrapper>
      </template>
      <a id="backgroundImageAttribution" href="[[backgroundImageAttributionUrl_]]" hidden="[[!backgroundImageAttribution1_]]">
        <div id="backgroundImageAttribution1Container">
          <div id="linkIcon"></div>
          <div id="backgroundImageAttribution1">
            [[backgroundImageAttribution1_]]
          </div>
        </div>
        <div id="backgroundImageAttribution2" hidden="[[!backgroundImageAttribution2_]]">
          [[backgroundImageAttribution2_]]
        </div>
      </a>
      <!-- cr-button has a transparent background. This leads to incorrect
           results when a custom background is set. Therefore, wrap customize
           button in container to enfore solid background color. -->
      <div id="customizeButtonContainer">
        <cr-button id="customizeButton" on-click="onCustomizeClick_" title="Customize this page">
          <div id="customizeIcon"></div>
          <div id="customizeText" hidden$="[[showBackgroundImage_]]">
            Customize Chrome
          </div>
        </cr-button>
      </div>
      <div id="themeAttribution" hidden$="[[!theme_.backgroundImage.attributionUrl]]">
        <div>Theme created by</div>
        <img src="[[theme_.backgroundImage.attributionUrl.url]]"><img>
      </div>
    </template>
  </dom-if>
  <div id="contentBottomSpacer"></div>
</div>
<dom-if if="[[showVoiceSearchOverlay_]]" restamp="">
  <template>
    <ntp-voice-search-overlay on-close="onVoiceSearchOverlayClose_">
    </ntp-voice-search-overlay>
  </template>
</dom-if>
<template is="dom-if" if="[[showCustomizeDialog_]]" restamp="">
  <ntp-customize-dialog on-close="onCustomizeDialogClose_" theme="[[theme_]]" background-selection="{{backgroundSelection_}}" selected-page="[[selectedCustomizeDialogPage_]]">
  </ntp-customize-dialog>
</template>
<dom-if if="[[lazyRender_]]" restamp="">
  <template>
    <cr-toast id="removeModuleToast" duration="10000">
      <div id="removeModuleToastMessage">[[removedModuleData_.message]]</div>
      <cr-button id="undoRemoveModuleButton" aria-label="Press Ctrl+Z to undo" on-click="onUndoRemoveModuleButtonClick_">
        Undo
      </cr-button>
    </cr-toast>
  </template>
</dom-if>
<div id="oneGoogleBarOverlayBackdrop"></div>
<svg>
  <defs>
    <clipPath id="oneGoogleBarClipPath">
      <!-- Set an initial non-empty clip-path so the OneGoogleBar resize events
           are processed. When the clip-path is empty, it's possible for the
           OneGoogleBar to get into a state where it does not send  the
           'overlayUpdates' message which is used to populate this
           clip-path. -->
      <rect x="0" y="0" width="1" height="1"></rect>
    </clipPath>
  </defs>
</svg>
<!--_html_template_end_-->`}static get properties(){return{iframeOneGoogleBarEnabled_:{type:Boolean,value:()=>{const params=new URLSearchParams(window.location.search);if(params.has("ogbinline")){return false}return loadTimeData.getBoolean("iframeOneGoogleBarEnabled")||params.has("ogbiframe")},reflectToAttribute:true},oneGoogleBarModalOverlaysEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("oneGoogleBarModalOverlaysEnabled")},oneGoogleBarIframePath_:{type:String,value:()=>{const params=new URLSearchParams;params.set("paramsencoded",btoa(window.location.search.replace(/^[?]/,"&")));return`chrome-untrusted://new-tab-page/one-google-bar?${params}`}},oneGoogleBarLoaded_:{observer:"oneGoogleBarLoadedChange_",type:Boolean,value:false},oneGoogleBarDarkThemeEnabled_:{type:Boolean,computed:`computeOneGoogleBarDarkThemeEnabled_(oneGoogleBarLoaded_,\n            theme_, backgroundSelection_)`,observer:"onOneGoogleBarDarkThemeEnabledChange_"},showIframedOneGoogleBar_:{type:Boolean,value:false,computed:`computeShowIframedOneGoogleBar_(iframeOneGoogleBarEnabled_,\n            lazyRender_)`},theme_:{observer:"onThemeChange_",type:Object},showCustomizeDialog_:Boolean,selectedCustomizeDialogPage_:String,showVoiceSearchOverlay_:Boolean,showBackgroundImage_:{computed:"computeShowBackgroundImage_(theme_, backgroundSelection_)",observer:"onShowBackgroundImageChange_",reflectToAttribute:true,type:Boolean},backgroundSelection_:{type:Object,value:()=>({type:BackgroundSelectionType.NO_SELECTION}),observer:"updateBackgroundImagePath_"},backgroundImageAttribution1_:{type:String,computed:`computeBackgroundImageAttribution1_(theme_,\n            backgroundSelection_)`},backgroundImageAttribution2_:{type:String,computed:`computeBackgroundImageAttribution2_(theme_,\n            backgroundSelection_)`},backgroundImageAttributionUrl_:{type:String,computed:`computeBackgroundImageAttributionUrl_(theme_,\n            backgroundSelection_)`},backgroundColor_:{computed:"computeBackgroundColor_(showBackgroundImage_, theme_)",type:Object},logoColor_:{type:String,computed:"computeLogoColor_(theme_, backgroundSelection_)"},singleColoredLogo_:{computed:"computeSingleColoredLogo_(theme_, backgroundSelection_)",type:Boolean},realboxShown_:{type:Boolean,computed:"computeRealboxShown_(theme_)"},logoEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("logoEnabled")},shortcutsEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("shortcutsEnabled")},middleSlotPromoEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("middleSlotPromoEnabled")},modulesVisibilityDetermined_:Boolean,middleSlotPromoLoaded_:Boolean,modulesLoaded_:Boolean,promoAndModulesLoaded_:{type:Boolean,computed:`computePromoAndModulesLoaded_(middleSlotPromoLoaded_,\n            modulesLoaded_)`,reflectToAttribute:true},modulesLoadedAndVisibilityDetermined_:{type:Boolean,computed:`computeModulesLoadedAndVisibilityDetermined_(\n          promoAndModulesLoaded_,\n          modulesVisibilityDetermined_)`,observer:"onModulesLoadedAndVisibilityDeterminedChange_"},lazyRender_:Boolean,moduleDescriptors_:Object,dismissedModules_:{type:Array,value:()=>[]},disabledModules_:{type:Object,value:()=>({all:true,ids:[]})},removedModuleData_:{type:Object,value:null}}}constructor(){performance.mark("app-creation-start");super();this.callbackRouter_=NewTabPageProxy.getInstance().callbackRouter;this.pageHandler_=NewTabPageProxy.getInstance().handler;this.backgroundManager_=BackgroundManager.getInstance();this.setThemeListenerId_=null;this.setDisabledModulesListenerId_=null;this.eventTracker_=new EventTracker;this.loadOneGoogleBar_();this.shouldPrintPerformance_=new URLSearchParams(location.search).has("print_perf");this.backgroundImageLoadStartEpoch_=performance.timeOrigin;this.backgroundImageLoadStart_=0}connectedCallback(){super.connectedCallback();this.setThemeListenerId_=this.callbackRouter_.setTheme.addListener((theme=>{performance.measure("theme-set");this.theme_=theme}));this.setDisabledModulesListenerId_=this.callbackRouter_.setDisabledModules.addListener(((all,ids)=>{this.disabledModules_={all:all,ids:ids};this.modulesVisibilityDetermined_=true}));this.pageHandler_.updateDisabledModules();this.eventTracker_.add(window,"message",(event=>{const data=event.data;if(typeof data!=="object"){return}if("frameType"in data&&data.frameType==="one-google-bar"){this.handleOneGoogleBarMessage_(event)}}));this.eventTracker_.add(window,"keydown",(e=>this.onWindowKeydown_(e)));if(this.shouldPrintPerformance_){this.backgroundManager_.getBackgroundImageLoadTime().then((time=>{const duration=time-this.backgroundImageLoadStartEpoch_;this.printPerformanceDatum_("background-image-load",this.backgroundImageLoadStart_,duration);this.printPerformanceDatum_("background-image-loaded",this.backgroundImageLoadStart_+duration)}),(()=>{console.error("Failed to capture background image load time")}))}FocusOutlineManager.forDocument(document)}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.setThemeListenerId_));this.callbackRouter_.removeListener(assert(this.setDisabledModulesListenerId_));this.eventTracker_.removeAll()}ready(){super.ready();this.pageHandler_.onAppRendered(WindowProxy.getInstance().now());WindowProxy.getInstance().waitForLazyRender().then((()=>{ensureLazyLoaded();this.lazyRender_=true}));this.printPerformance_();performance.measure("app-creation","app-creation-start")}computeOneGoogleBarDarkThemeEnabled_(){if(!this.theme_||!this.oneGoogleBarLoaded_){return false}switch(this.backgroundSelection_.type){case BackgroundSelectionType.IMAGE:return true;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:case BackgroundSelectionType.NO_SELECTION:default:return this.theme_.isDark}}async loadOneGoogleBar_(){if(this.iframeOneGoogleBarEnabled_){const oneGoogleBar=document.querySelector("#oneGoogleBar");if(oneGoogleBar){oneGoogleBar.remove()}return}const{parts:parts}=await this.pageHandler_.getOneGoogleBarParts(window.location.search.replace(/^[?]/,"&"));if(!parts){return}const inHeadStyle=document.createElement("style");inHeadStyle.type="text/css";inHeadStyle.appendChild(document.createTextNode(parts.inHeadStyle));document.head.appendChild(inHeadStyle);const inHeadScript=document.createElement("script");inHeadScript.type="text/javascript";inHeadScript.appendChild(document.createTextNode(parts.inHeadScript));document.head.appendChild(inHeadScript);this.oneGoogleBarLoaded_=true;const oneGoogleBar=document.querySelector("#oneGoogleBar");oneGoogleBar.innerHTML=parts.barHtml;const afterBarScript=document.createElement("script");afterBarScript.type="text/javascript";afterBarScript.appendChild(document.createTextNode(parts.afterBarScript));oneGoogleBar.parentNode.insertBefore(afterBarScript,oneGoogleBar.nextSibling);document.querySelector("#oneGoogleBarEndOfBody").innerHTML=parts.endOfBodyHtml;const endOfBodyScript=document.createElement("script");endOfBodyScript.type="text/javascript";endOfBodyScript.appendChild(document.createTextNode(parts.endOfBodyScript));document.body.appendChild(endOfBodyScript);this.pageHandler_.onOneGoogleBarRendered(WindowProxy.getInstance().now());oneGoogleBarApi.trackDarkModeChanges()}onOneGoogleBarDarkThemeEnabledChange_(){if(!this.oneGoogleBarLoaded_){return}if(this.iframeOneGoogleBarEnabled_){$$(this,"#oneGoogleBar").postMessage({type:"enableDarkTheme",enabled:this.oneGoogleBarDarkThemeEnabled_});return}oneGoogleBarApi.setForegroundLight(this.oneGoogleBarDarkThemeEnabled_)}computeShowIframedOneGoogleBar_(){return this.iframeOneGoogleBarEnabled_&&this.lazyRender_}computeBackgroundImageAttribution1_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return this.theme_&&this.theme_.backgroundImageAttribution1||"";case BackgroundSelectionType.IMAGE:return this.backgroundSelection_.image.attribution1;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return""}}computeBackgroundImageAttribution2_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return this.theme_&&this.theme_.backgroundImageAttribution2||"";case BackgroundSelectionType.IMAGE:return this.backgroundSelection_.image.attribution2;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return""}}computeBackgroundImageAttributionUrl_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return this.theme_&&this.theme_.backgroundImageAttributionUrl?this.theme_.backgroundImageAttributionUrl.url:"";case BackgroundSelectionType.IMAGE:return this.backgroundSelection_.image.attributionUrl.url;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return""}}computeRealboxShown_(){return!loadTimeData.getBoolean("realboxMatchOmniboxTheme")||!!this.theme_}computePromoAndModulesLoaded_(){return(!loadTimeData.getBoolean("middleSlotPromoEnabled")||this.middleSlotPromoLoaded_)&&(!loadTimeData.getBoolean("modulesEnabled")||this.modulesLoaded_)}computeModulesLoadedAndVisibilityDetermined_(){return this.promoAndModulesLoaded_&&this.modulesVisibilityDetermined_}async onLazyRendered_(){if(!loadTimeData.getBoolean("modulesLoadEnabled")&&!loadTimeData.getBoolean("modulesEnabled")){return}const descriptors=await ModuleRegistry.getInstance().initializeModules(loadTimeData.getInteger("modulesLoadTimeout"));if(descriptors){this.pageHandler_.onModulesLoadedWithData()}if(!loadTimeData.getBoolean("modulesEnabled")){return}this.moduleDescriptors_=descriptors}onOpenVoiceSearch_(){this.showVoiceSearchOverlay_=true;this.pageHandler_.onVoiceSearchAction(newTabPage.mojom.VoiceSearchAction.kActivateSearchBox)}onCustomizeClick_(){this.showCustomizeDialog_=true}onCustomizeDialogClose_(){this.showCustomizeDialog_=false;this.selectedCustomizeDialogPage_=null}onVoiceSearchOverlayClose_(){this.showVoiceSearchOverlay_=false}onWindowKeydown_(e){let ctrlKeyPressed=e.ctrlKey;if(ctrlKeyPressed&&e.code==="Period"&&e.shiftKey){this.showVoiceSearchOverlay_=true;this.pageHandler_.onVoiceSearchAction(newTabPage.mojom.VoiceSearchAction.kActivateKeyboard)}if(ctrlKeyPressed&&e.key==="z"){this.onUndoRemoveModuleButtonClick_()}}rgbaOrInherit_(skColor){return skColor?skColorToRgba(skColor):"inherit"}computeShowBackgroundImage_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return!!this.theme_&&!!this.theme_.backgroundImage;case BackgroundSelectionType.IMAGE:return true;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return false}}onShowBackgroundImageChange_(){this.backgroundManager_.setShowBackgroundImage(this.showBackgroundImage_)}onThemeChange_(){if(this.theme_){this.backgroundManager_.setBackgroundColor(this.theme_.backgroundColor)}this.updateBackgroundImagePath_()}onModulesLoadedAndVisibilityDeterminedChange_(){if(this.modulesLoadedAndVisibilityDetermined_&&loadTimeData.getBoolean("modulesEnabled")){recordLoadDuration("NewTabPage.Modules.ShownTime",WindowProxy.getInstance().now());this.moduleDescriptors_.forEach((({id:id})=>{chrome.metricsPrivate.recordBoolean(`NewTabPage.Modules.EnabledOnNTPLoad.${id}`,!this.disabledModules_.all&&!this.disabledModules_.ids.includes(id))}));chrome.metricsPrivate.recordBoolean("NewTabPage.Modules.VisibleOnNTPLoad",!this.disabledModules_.all)}}updateBackgroundImagePath_(){if(!this.showCustomizeDialog_&&this.backgroundSelection_.type!==BackgroundSelectionType.NO_SELECTION){if(this.backgroundSelection_.type===BackgroundSelectionType.NO_BACKGROUND){setTimeout((()=>{this.backgroundSelection_={type:BackgroundSelectionType.NO_SELECTION}}),100)}else{this.backgroundSelection_={type:BackgroundSelectionType.NO_SELECTION}}}let backgroundImage;switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:backgroundImage=this.theme_&&this.theme_.backgroundImage;break;case BackgroundSelectionType.IMAGE:backgroundImage={url:{url:this.backgroundSelection_.image.imageUrl.url}};break}if(backgroundImage){this.backgroundManager_.setBackgroundImage(backgroundImage)}}computeBackgroundColor_(){if(this.showBackgroundImage_){return null}return this.theme_&&this.theme_.backgroundColor}computeLogoColor_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.IMAGE:return hexColorToSkColor("#ffffff");case BackgroundSelectionType.NO_SELECTION:case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return this.theme_&&(this.theme_.logoColor||(this.theme_.isDark?hexColorToSkColor("#ffffff"):null))}}computeSingleColoredLogo_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.IMAGE:return true;case BackgroundSelectionType.DAILY_REFRESH:case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.NO_SELECTION:default:return this.theme_&&(!!this.theme_.logoColor||this.theme_.isDark)}}canShowPromoWithBrowserCommand_(messageData,commandSource,commandOrigin){const commandId=Object.values(promoBrowserCommand.mojom.Command).includes(messageData.commandId)?messageData.commandId:promoBrowserCommand.mojom.Command.kUnknownCommand;PromoBrowserCommandProxy.getInstance().handler.canShowPromoWithCommand(commandId).then((({canShow:canShow})=>{const response={messageType:messageData.messageType};response[messageData.commandId]=canShow;commandSource.postMessage(response,commandOrigin)}))}executePromoBrowserCommand_(commandData,commandSource,commandOrigin){const commandId=Object.values(promoBrowserCommand.mojom.Command).includes(commandData.commandId)?commandData.commandId:promoBrowserCommand.mojom.Command.kUnknownCommand;PromoBrowserCommandProxy.getInstance().handler.executeCommand(commandId,commandData.clickInfo).then((({commandExecuted:commandExecuted})=>{commandSource.postMessage(commandExecuted,commandOrigin)}))}handleOneGoogleBarMessage_(event){const data=event.data;if(data.messageType==="loaded"){if(!this.oneGoogleBarModalOverlaysEnabled_){const oneGoogleBar=$$(this,"#oneGoogleBar");oneGoogleBar.style.clipPath="url(#oneGoogleBarClipPath)";oneGoogleBar.style.zIndex="1000"}this.oneGoogleBarLoaded_=true;this.pageHandler_.onOneGoogleBarRendered(WindowProxy.getInstance().now())}else if(data.messageType==="overlaysUpdated"){this.$.oneGoogleBarClipPath.querySelectorAll("rect").forEach((el=>{el.remove()}));const overlayRects=data.data;overlayRects.forEach((({x:x,y:y,width:width,height:height})=>{const rectElement=document.createElementNS("http://www.w3.org/2000/svg","rect");rectElement.setAttribute("x",x-8);rectElement.setAttribute("y",y-8);rectElement.setAttribute("width",width+16);rectElement.setAttribute("height",height+16);this.$.oneGoogleBarClipPath.appendChild(rectElement)}))}else if(data.messageType==="activate"){this.$.oneGoogleBarOverlayBackdrop.toggleAttribute("show",true);$$(this,"#oneGoogleBar").style.zIndex="1000"}else if(data.messageType==="deactivate"){this.$.oneGoogleBarOverlayBackdrop.toggleAttribute("show",false);$$(this,"#oneGoogleBar").style.zIndex="0"}else if(data.messageType==="can-show-promo-with-browser-command"){this.canShowPromoWithBrowserCommand_(data,event.source,event.origin)}else if(data.messageType==="execute-browser-command"){this.executePromoBrowserCommand_(data.data,event.source,event.origin)}}oneGoogleBarLoadedChange_(){if(this.oneGoogleBarLoaded_&&this.iframeOneGoogleBarEnabled_&&this.oneGoogleBarModalOverlaysEnabled_){this.setupShortcutDragDropOneGoogleBarWorkaround_()}}onMiddleSlotPromoLoaded_(){this.middleSlotPromoLoaded_=true}onModulesLoaded_(){this.modulesLoaded_=true}onDismissModule_(e){const id=$$(this,"#modules").itemForElement(e.target).id;const restoreCallback=e.detail.restoreCallback;this.removedModuleData_={message:e.detail.message,undo:()=>{this.splice("dismissedModules_",this.dismissedModules_.indexOf(id),1);restoreCallback();this.pageHandler_.onRestoreModule(id)}};if(!this.dismissedModules_.includes(id)){this.push("dismissedModules_",id)}$$(this,"#removeModuleToast").show();this.pageHandler_.onDismissModule(id)}onDisableModule_(e){const id=$$(this,"#modules").itemForElement(e.target).id;const restoreCallback=e.detail.restoreCallback;this.removedModuleData_={message:e.detail.message,undo:()=>{if(restoreCallback){restoreCallback()}this.pageHandler_.setModuleDisabled(id,false);chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Enabled",id);chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Enabled.Toast",id)}};this.pageHandler_.setModuleDisabled(id,true);$$(this,"#removeModuleToast").show();chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Disabled",id);chrome.metricsPrivate.recordSparseHashable("NewTabPage.Modules.Disabled.ModuleRequest",id)}onCustomizeModule_(){this.showCustomizeDialog_=true;this.selectedCustomizeDialogPage_=CustomizeDialogPage.MODULES}moduleDisabled_(id){return this.disabledModules_.all||this.dismissedModules_.includes(id)||this.disabledModules_.ids.includes(id)}onUndoRemoveModuleButtonClick_(){if(!this.removedModuleData_){return}this.removedModuleData_.undo();$$(this,"#removeModuleToast").hide();this.removedModuleData_=null}setupShortcutDragDropOneGoogleBarWorkaround_(){const iframe=$$(this,"#oneGoogleBar");let resetAtDragEnd=false;let dragging=false;let originalPointerEvents;this.eventTracker_.add(this.$.mostVisited,"pointerenter",(()=>{if(dragging){resetAtDragEnd=false;return}originalPointerEvents=getComputedStyle(iframe).pointerEvents;iframe.style.pointerEvents="none"}));this.eventTracker_.add(this.$.mostVisited,"pointerleave",(()=>{if(dragging){resetAtDragEnd=true;return}iframe.style.pointerEvents=originalPointerEvents}));this.eventTracker_.add(this.$.mostVisited,"dragstart",(()=>{dragging=true}));this.eventTracker_.add(this.$.mostVisited,"dragend",(()=>{dragging=false;if(resetAtDragEnd){resetAtDragEnd=false;iframe.style.pointerEvents=originalPointerEvents}}))}printPerformanceDatum_(name,time,auxTime=0){if(!this.shouldPrintPerformance_){return}if(!auxTime){console.log(`${name}: ${time}`)}else{console.log(`${name}: ${time} (${auxTime})`)}}printPerformance_(){if(!this.shouldPrintPerformance_){return}const entryTypes=["paint","measure"];const log=entry=>{this.printPerformanceDatum_(entry.name,entry.duration?entry.duration:entry.startTime,entry.duration&&entry.startTime?entry.startTime:0)};const observer=new PerformanceObserver((list=>{list.getEntries().forEach((entry=>{log(entry)}))}));observer.observe({entryTypes:entryTypes});performance.getEntries().forEach((entry=>{if(!entryTypes.includes(entry.entryType)){return}log(entry)}))}}customElements.define(AppElement.is,AppElement);export{BackgroundManager,DriveProxy,ModuleHeaderElement,RealboxBrowserProxy,TaskModuleHandlerProxy,chromeCartDescriptor,driveDescriptor,recipeTasksDescriptor,shoppingTasksDescriptor};