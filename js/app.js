$('a[data-toggle="tab"]').on("show.bs.tab",function(a){a.target,a.relatedTarget,$(".rec-list a").removeClass("active"),$(this).addClass("active")});