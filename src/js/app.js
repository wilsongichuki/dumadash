$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab

    $(".rec-list a").removeClass('active');
    $(this).addClass('active');

});