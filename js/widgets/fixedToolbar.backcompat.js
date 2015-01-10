//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Backcompat features fo fixed toolbars
//>>label: Toolbars: Fixed
//>>group: Widgets

define( [ "jquery", "./fixedToolbar" ], function( jQuery ) {

//>>excludeEnd("jqmBuildExclude");

( function( $, undefined ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.toolbar", $.mobile.toolbar, {

		options: {
			hideDuringFocus: "input, textarea, select"
		},

		_attachToggleHandlersToPage: function( page ) {
			var	delayShow, delayHide,
				isVisible = true,
				self = this;

			page.bind( "focusin focusout", function( event ) {

				// This hides the toolbars on a keyboard pop to give more screen room and prevent
				// ios bug which positions fixed toolbars in the middle of the screen on pop if the
				// input is near the top or bottom of the screen addresses issues #4410 Footer
				// navbar moves up when clicking on a textbox in an Android environment and issue
				// #4113 Header and footer change their position after keyboard popup - iOS and
				// issue #4410 Footer navbar moves up when clicking on a textbox in an Android
				// environment
				if ( this.options.hideDuringFocus && screen.width < 1025 &&
						$( event.target ).is( this.options.hideDuringFocus ) &&
						!$( event.target )
							.closest( ".ui-header-fixed, .ui-footer-fixed" ).length ) {

					// Fix for issue #4724 Moving through form in Mobile Safari with "Next" and
					// "Previous" system controls causes fixed position, tap-toggle false Header to
					// reveal itself isVisible instead of self._visible because the focusin and
					// focusout events fire twice at the same time Also use a delay for hiding the
					// toolbars because on Android native browser focusin is direclty followed by a
					// focusout when a native selects opens and the other way around when it closes.
					if ( event.type === "focusout" && !isVisible ) {
						isVisible = true;

						// Wait for the stack to unwind and see if we have jumped to another input
						clearTimeout( delayHide );
						delayShow = setTimeout( function() {
							self.show();
						}, 0 );
					} else if ( event.type === "focusin" && !!isVisible ) {

						// If we have jumped to another input clear the time out to cancel the show
						clearTimeout( delayShow );
							isVisible = false;
							delayHide = setTimeout( function() {
							self.hide();
						}, 0 );
					}
				}
			} );
		}

	} );

}

} )( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
