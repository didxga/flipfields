flipFields
==========

FlipFields is a fully-tested jQuery plugin for minimal edit-in-place behavior.

No AJAX behavior, nothing you don't need.

usage:

`$('input').flipFields();`

Clicking on a span tag will show the input; blurring or hitting enter will hide the input and update the span.
Hitting ESC while in an input will cancel any changes made to an input.
Input values should be text-only (Behavior with HTML-encoded input is untested).

flipFields takes an options hash. Currently the only option is `spanClass`, the value of which is added as a class to the generated spans.

example:

`$('input').flipFields({spanClass: 'someClassName'});`



