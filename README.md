# Last Source
With Last Source enabled it is as easy as lastSource.getLastSource() to get the last source/referrer your visitor visited. This is very useful in affiliate programs where you want to pay your affiliate only if the last click to your website came from his website and not AdWords, your newsletter or any other source.

When you include Last Source with

```html
<script src="/js/lastsource.js"></script>
```

the `lastSource` object will be bound to the `window` object so you can do:

```javascript
if(lastSource.getLastSource() == "your-affiliate's-code") {
    // inject tracking pixel
}
```

## Example
Say you use Partner Ads for affiliates, and you know that affiliates tag your links with utm_source=partnerads, then your javascript on your checkout page will look like this:

```javascript
if(lastSource.getLastSource() == 'partnerads') {
    $('body').append('<img src="https://www.partner-ads.com/dk/leadtrack.php?programid=[program id]&type=salg&ordrenummer=[order id]&varenummer=x&antal=1&omprsalg=[revenue]" width=0 height=0 style="display:none">');
}
```