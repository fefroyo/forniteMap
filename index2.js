function $(e, t) {
    return (t || document).querySelector(e)
}

function $$(e, t) {
    return (t || document).querySelectorAll(e)
}

function each(e, t) {
    for (var o = 0; o < e.length; o++) t.call(this, o, e[o])
}

function remove(e) {
    e.parentElement && e.parentElement.removeChild(e)
}

function openEmbed(e) {
    var t = null != window.screenLeft ? window.screenLeft : window.screenX,
        o = null != window.screenTop ? window.screenTop : window.screenY,
        a = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
        n = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
        l = a / window.screen.availWidth,
        r = (n - 450) / 2 / l + o,
        i = (a - 800) / 2 / l + t,
        s = window.open(e, "", "top=" + r + ",left=" + i + ",width=800,height=450,menubar=no,toolbar=no,location=no,status=no,titlebar=no,scrollbars=no");
    window.focus && s.focus()
}

function getUrlParameter(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
    return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
}

function showMessage(e, t) {
    $("#message").className = t, $("#message").textContent = e, $("#message").style.display = "block", setTimeout(function() {
        $("#message").style.display = "none"
    }, 4e3)
}

function setTooltip(e, t) {
    e.setAttribute("data-tooltip", t), $(".tooltip") && remove($(".tooltip")), e.onmouseenter || initTooltip(e)
}

function initTooltip(e) {
    e.onmouseenter = function() {
        document.body.appendChild(tooltip), tooltip.textContent = this.getAttribute("data-tooltip");
        var e = this.getBoundingClientRect(),
            t = window.pageYOffset + e.top + e.height,
            o = 0;
        o = this.hasAttribute("data-tooltip-left") ? window.pageXOffset + e.left : this.hasAttribute("data-tooltip-right") ? window.pageXOffset + e.right - tooltip.offsetWidth : window.pageXOffset + e.left + e.width / 2 - tooltip.offsetWidth / 2, tooltip.style.top = t + "px", tooltip.style.left = o + "px"
    }, e.onmouseleave = function() {
        remove(tooltip)
    }
}
var tooltip = document.createElement("div");
tooltip.className = "tooltip", window.addEventListener("DOMContentLoaded", function() {
    for (var e = $$("[data-tooltip]"), t = 0; t < e.length; t++) initTooltip(e[t]);
    document.addEventListener("click", function() {
        remove(tooltip)
    })
});
var $lid = $("#lid");
document.addEventListener("mousedown", function() {
    $lid.style.top = "0", setTimeout(function() {
        $lid.style.top = "-100%"
    }, 75)
});
var $leakedCount = $("#leaked-count");
if ($leakedCount) {
    var xhrLeadedCount = new XMLHttpRequest;
    xhrLeadedCount.open("GET", "/leaked-count.txt"), xhrLeadedCount.onload = function() {
        200 === xhrLeadedCount.status && ($leakedCount.textContent = xhrLeadedCount.responseText)
    }, xhrLeadedCount.send()
}
var $aux = $("#aux");
if ($aux) {
    var xhrAux = new XMLHttpRequest;
    xhrAux.open("GET", "/get-promotion.php"), xhrAux.onload = function() {
        200 === xhrAux.status && ($aux.innerHTML = xhrAux.responseText)
    }, xhrAux.send()
}

function auxClick(e) {
    var t = new XMLHttpRequest;
    t.open("GET", "/click-promotion.php?id=" + e), t.send()
}
var $topDonate = $("#top-donate a");
if ($topDonate) {
    var xhrTopDonate = new XMLHttpRequest;
    xhrTopDonate.open("GET", "https://www.retailrow.info/lootlake/top-donate.json"), xhrTopDonate.onload = function() {
        if (200 === xhrTopDonate.status) {
            var e = JSON.parse(xhrTopDonate.responseText);
            e.name ? $topDonate.innerHTML = '<span style="color: #cbd3de;">Top Donate:</span> $' + e.total + " <b>" + e.name + "</b>" : $topDonate.innerHTML = '<span style="color: #cbd3de;">Top Donate:</span> 0</b>'
        }
    }, xhrTopDonate.send()
}

function selectWeek(e, t, o, a) {
    e.stopPropagation(), t = t.parentNode.parentNode;
    var n = "";
    "week switch" === t.className ? (n = " selected", selected[o][a] = {}, each(Data[o][a].challenges, function(e, t) {
        t.sub ? (selected[o][a][e] = {}, each(t.sub, function(t) {
            selected[o][a][e][t] = 1
        })) : selected[o][a][e] = 1
    }), each(overlays[o][a], function(e, t) {
        Array.isArray(t) ? each(t, function(e, t) {
            map.addLayer(t)
        }) : map.addLayer(t)
    })) : (selected[o][a] = {}, each(overlays[o][a], function(e, t) {
        Array.isArray(t) ? each(t, function(e, t) {
            map.removeLayer(t)
        }) : map.removeLayer(t)
    })), t.className = "week switch" + n, each($$(".challenge", t.parentNode), function(e, t) {
        t.className = "challenge switch" + n
    }), localStorage.selected = JSON.stringify(selected)
}

function selectChallenge(e, t, o, a, n) {
    var l = (e = e.parentNode.parentNode).parentNode;
    isNaN(n) || (l = l.parentNode), "challenge switch" === e.className ? (e.className = "challenge switch selected", selected[t][o] || (selected[t][o] = {}), "all" === n ? (each($$(".challenge", e.nextSibling), function(e, t) {
        t.className = "challenge switch selected"
    }), selected[t][o][a] = {}, each(Data[t][o].challenges[a].sub, function(e) {
        selected[t][o][a][e] = 1, overlays[t][o][a] && void 0 !== overlays[t][o][a][e] && map.addLayer(overlays[t][o][a][e])
    })) : isNaN(n) ? (selected[t][o][a] = 1, overlays[t][o] && void 0 !== overlays[t][o][a] && map.addLayer(overlays[t][o][a])) : (e.parentNode.previousSibling.className = "challenge switch selected", selected[t][o][a] || (selected[t][o][a] = {}), selected[t][o][a][n] = 1, overlays[t][o][a] && void 0 !== overlays[t][o][a][n] && map.addLayer(overlays[t][o][a][n])), $(".week", l).className = "week switch selected") : (e.className = "challenge switch", "all" === n ? (each($$(".challenge", e.nextSibling), function(e, t) {
        t.className = "challenge switch"
    }), delete selected[t][o][a], each(Data[t][o].challenges[a].sub, function(e) {
        overlays[t][o][a] && void 0 !== overlays[t][o][a][e] && map.removeLayer(overlays[t][o][a][e])
    })) : isNaN(n) ? (delete selected[t][o][a], overlays[t][o] && void 0 !== overlays[t][o][a] && map.removeLayer(overlays[t][o][a])) : ($(".challenge.selected", e.parentNode) || (e.parentNode.previousSibling.className = "challenge switch"), delete selected[t][o][a][n], 0 === Object.keys(selected[t][o][a]).length && delete selected[t][o][a], overlays[t][o][a] && void 0 !== overlays[t][o][a][n] && map.removeLayer(overlays[t][o][a][n])), 0 === Object.keys(selected[t][o]).length && ($(".week", l).className = "week switch")), localStorage.selected = JSON.stringify(selected)
}

function openWeek(e, t, o) {
    "week-wrap opened" === e.parentNode.className ? (e.parentNode.className = "week-wrap", delete opened[t][o]) : (e.parentNode.className = "week-wrap opened", opened[t][o] = 1), localStorage.opened = JSON.stringify(opened)
}

function sort(e) {
    var t = e.parentNode,
        o = $$(".challenge", e.parentNode);
    each([].map.call(o, function(e) {
        return t.removeChild(e), e
    }).sort(function(e, t) {
        return +e.getAttribute("data-sort") - +t.getAttribute("data-sort")
    }), function(e, o) {
        t.appendChild(o)
    })
}

function createMarker(e, t, o) {
    var a = null;
    if (e.icon && (a = {
            icon: L.icon({
                iconUrl: "./icons/" + e.icon + ".png",
                iconSize: [40, 40],
                tooltipAnchor: [20, 0]
            })
        }), e.tunnel || e.onewayTunnel) each(e.coords, function(o, a) {
        var n = e.tunnel ? "#27b3ff" : "#fff",
            l = (L.polyline(a, {
                weight: 8,
                color: "#000"
            }).addTo(t), L.polyline(a, {
                weight: 3,
                color: n
            }).addTo(t), {
                radius: 5,
                weight: 2,
                color: "#000",
                fillColor: n,
                fillOpacity: 1
            });
        if (L.circleMarker(a[0], l).addTo(t), e.tunnel) L.circleMarker(a[1], l).addTo(t);
        else {
            var r = a[1][0] - a[0][0],
                i = a[1][1] - a[0][1],
                s = {
                    iconSize: [22, 22],
                    iconAnchor: [11, 11],
                    html: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" transform="rotate(' + (360 - 57.295779513082 * Math.atan2(r, i)) + ')"><path fill=' + n + ' stroke="#000" stroke-opacity="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M22 12l-20 12 5-12-5-12z"/></svg>'
                };
            L.marker(a[1], {
                icon: L.divIcon(s)
            }).addTo(t)
        }
    });
    else if (e.line) each(e.coords, function(e, a) {
        var n = L.polyline(a, {
                weight: 8,
                color: "#ffcc7b"
            }).addTo(t),
            l = L.polyline(a, {
                weight: 3,
                color: "#222"
            }).addTo(t),
            r = {
                radius: 5,
                weight: 2,
                color: "#ffcc7b",
                fillColor: "#222",
                fillOpacity: 1
            };
        L.circleMarker(a[0], r).addTo(t), L.circleMarker(a[1], r).addTo(t), o && (n.bindTooltip(o), l.bindTooltip(o))
    });
    else if (e.path) each(e.coords, function(n, l) {
        var r = "#149bc7";
        "string" == typeof e.path && (r = e.path);
        var i = L.polyline(l, {
                weight: 8,
                color: "#000"
            }).addTo(t),
            s = L.polyline(l, {
                weight: 3,
                color: r
            }).addTo(t);
        L.marker(l[0], a).addTo(t).bindTooltip(o), L.marker(l[1], a).addTo(t).bindTooltip(o), l[2] && L.marker(l[2], a).addTo(t).bindTooltip(o), o && (i.bindTooltip(o), s.bindTooltip(o))
    });
    else if (e.stream) {
        var n = L.polyline(e.coords, {
                weight: 8,
                color: "#000"
            }).addTo(t),
            l = L.polyline(e.coords, {
                weight: 3,
                color: "#f533dd"
            }).addTo(t);
        o && (n.bindTooltip(o), l.bindTooltip(o))
    } else e.coords && each(e.coords, function(n, l) {
        var r = L.marker(l, a).addTo(t);
        "?dev" === location.search && r.on("click", function(e) {
            copyToClipboard("[" + e.latlng.lat + ", " + e.latlng.lng + "]")
        }), !o && ~location.href.indexOf("speedy") && r.on("contextmenu", function(e) {
            var t = e.target.options.icon.options.iconUrl.replace("./icons/", "").replace(".png", ""),
                o = ["", ""],
                a = "";
            each(Data.specials[0].challenges, function(n, l) {
                for (var r = 0; r < l.markers.length; r++) {
                    var i = r > 0 ? l.name + " - " + (r + 1) : l.name,
                        s = l.name.toLowerCase();
                    "ammo boxes" === s ? s = "ammo box" : "s" === s[s.length - 1] && (s = s.slice(0, -1)), s = r > 0 ? s + " - " + (r + 1) : s, l.markers[r].icon && (l.markers[r].icon == t && (o = [i, s]), a += "<div class=\"item\" onclick=\"speedy('add', '" + i + "', " + e.latlng.lat + ", " + e.latlng.lng + ')"><img src="./icons/' + l.markers[r].icon + '.png"> Add ' + s + "</div>")
                }
            }), $contextmenu.style.top = e.containerPoint.y + "px", $contextmenu.style.left = e.containerPoint.x + "px", $contextmenu.style.display = "block", L.DomUtil.empty($contextmenu), $remove = L.DomUtil.create("div", "item", $contextmenu), $remove.innerHTML = '<img src="./icons/' + t + '.png"> Remove ' + o[1], $remove.addEventListener("click", function() {
                map.removeLayer(r), speedy("remove", o[0], e.latlng.lat, e.latlng.lng)
            });
            var n = L.DomUtil.create("div");
            n.innerHTML = '<div class="sep"></div>' + a, $contextmenu.appendChild(n)
        }), o && r.bindTooltip(o), e.yt && r.on("click", function() {
            openEmbed("https://www.youtube.com/embed/" + e.yt + "?autoplay=1")
        }), e.popup && r.bindPopup('<img src="/popups/' + e.popup + '.jpg" width="240" height="240">', {
            maxWidth: "auto"
        })
    })
}

function printWeeks(e) {
    for (var t = null, o = "", a = 0; a < Data[e].length; a++)
        if (!(Data[e][a].until && Data[e][a].until < Date.now())) {
            overlays[e][a] = [];
            var n = Data[e][a].name;
            Data[e][a].edited > localStorage.lastSeen && (n += ' <span class="badge">NEW</span>'), Data[e][a].until && (n += ' <span class="badge countdown" data-until="' + Data[e][a].until + '"></span>'), Data[e][a].badge && (n += ' <span class="badge">' + Data[e][a].badge + "</span>"), o += '<div class="week-wrap' + (opened[e][a] ? " opened" : "") + '"><div class="week switch' + (selected[e][a] && Object.keys(selected[e][a]).length ? " selected" : "") + '" onclick="openWeek(this, \'' + e + "', " + a + ')"><span><i onclick="selectWeek(event, this, \'' + e + "', " + a + ')"></i></span><span>' + n + "</span></div>", Data[e][a].sortable && (o += '<div class="sort" onclick="sort(this)"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M6 22l6-8h-4v-12h-4v12h-4l6 8zm11.694-19.997h2.525l3.781 10.997h-2.421l-.705-2.261h-3.935l-.723 2.261h-2.336l3.814-10.997zm-.147 6.841h2.736l-1.35-4.326-1.386 4.326zm-.951 11.922l3.578-4.526h-3.487v-1.24h5.304v1.173l-3.624 4.593h3.633v1.234h-5.404v-1.234z"></path></svg> Sort</div>');
            for (var l = 0; l < Data[e][a].challenges.length; l++) {
                var r = Data[e][a].challenges[l];
                if (o += '<div class="challenge switch' + (selected[e][a] && selected[e][a][l] ? " selected" : "") + '"' + (r.sort ? ' data-sort="' + r.sort + '"' : "") + "><span><i onclick=\"selectChallenge(this, '" + e + "', " + a + ", " + l + (r.sub ? ", 'all'" : "") + ')"></i></span><span>' + (r.menuIcon ? '<img src="./icons/' + r.menuIcon + '.png"> ' : "") + r.name + "</span></div>", t = "Chests" === r.name || "Floor Loot" === r.name || "Ammo Boxes" === r.name || "Fishing Holes" === r.name ? function(e) {
                        return L.markerClusterGroup({
                            showCoverageOnHover: !1,
                            spiderfyOnMaxZoom: !1,
                            disableClusteringAtZoom: 2,
                            maxClusterRadius: 40,
                            iconCreateFunction: function(t) {
                                var o = t.getChildCount(),
                                    a = e + "-cluster";
                                return a += " cluster-", a += o < 6 ? "small" : o < 11 ? "medium" : "large", L.divIcon({
                                    className: a,
                                    html: "<div>" + o + "</div>",
                                    iconSize: [40, 40]
                                })
                            }
                        })
                    }(r.name.toLowerCase().replace(" ", "-")) : L.layerGroup(), r.sub) {
                    overlays[e][a][l] = [], o += '<div class="subs">';
                    for (var i = 0; i < r.sub.length; i++) {
                        t = L.layerGroup();
                        var s = r.sub[i];
                        if (o += '<div class="challenge switch' + (selected[e][a] && selected[e][a][l] && selected[e][a][l][i] ? " selected" : "") + '"><span><i onclick="selectChallenge(this, \'' + e + "', " + a + ", " + l + ", " + i + ')"></i></span><span>' + s.name + "</span></div>", s.spawnRef) {
                            c = [];
                            each(s.spawnRef, function(e, t) {
                                c = c.concat(Data.specials[0].challenges[t].markers)
                            }), s.markers = c
                        }
                        s.markers && each(s.markers, function(o, n) {
                            createMarker(n, t, "SPAWNS" !== Data[e][a].name ? r.name + " " + s.name : "")
                        }), overlays[e][a][l][i] = t, selected[e][a] && selected[e][a][l] && selected[e][a][l][i] && map.addLayer(t)
                    }
                    o += "</div>"
                } else {
                    if (r.spawnRef) {
                        var c = [];
                        each(r.spawnRef, function(e, t) {
                            c = c.concat(Data.specials[0].challenges[t].markers)
                        }), r.markers = c
                    }
                    r.markers && ("Landmarks" === r.name ? each(r.markers, function(e, o) {
                        L.marker(o.coords, {
                            icon: L.divIcon({
                                className: "label landmark",
                                html: "<div>" + o.name + "</div>",
                                iconSize: null
                            })
                        }).addTo(t)
                    }) : "Water Direction" === r.name ? each(r.markers, function(e, o) {
                        L.marker(o.coords, {
                            icon: L.divIcon({
                                className: "arrowIcon",
                                iconSize: [22, 22],
                                iconAnchor: [11, 11],
                                html: '<svg width="22" height="22" viewBox="0 0 24 24" transform="rotate(' + o.angle + ')"><path fill="#fff" stroke="#000" d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z"/></svg>'
                            })
                        }).addTo(t)
                    }) : each(r.markers, function(o, n) {
                        createMarker(n, t, "SPAWNS" !== Data[e][a].name ? r.name : "")
                    })), overlays[e][a][l] = t, selected[e][a] && selected[e][a][l] && map.addLayer(t)
                }
            }
            o += "</div>"
        } $("#" + e).innerHTML = o
}

function resize(e, t) {
    L.Browser.mobile || ($resizeSidebar.style.left = $toggleSidebar.style.left = $sidebar.style.width = e + "px", t && ($map.style.left = e + "px"))
}

function startDrag(e) {
    dragging = !0;
    var t = (e.pageX || e.changedTouches[0].pageX) - resizeX;
    document.addEventListener("mousemove", function(e) {
        e.preventDefault(), dragging && resize(resizeX = e.pageX - t)
    }), document.addEventListener("touchmove", function(e) {
        e.preventDefault();
        var o = e.changedTouches;
        if (dragging)
            for (var a = 0; a < o.length; a++) resize(resizeX = o[a].pageX - t)
    })
}

function endDrag() {
    dragging && (dragging = !1, localStorage.resize = resizeX, $map.style.left = resizeX + "px", map.invalidateSize(), map.fitBounds(bounds))
}

function copyToClipboard(e) {
    var t = document.createElement("textarea");
    t.style.position = "absolute", t.style.left = "-9999px", t.style.top = "-9999px", document.body.appendChild(t), t.textContent = e, t.focus(), t.setSelectionRange(0, t.value.length), document.execCommand("copy")
}

function escapeHtml(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}
var dragging = !1,
    resizeX = localStorage.resize || 360,
    zoomPosition = "topright",
    $map = $("#map"),
    $contextmenu = $("#contextmenu"),
    $message = $("#message"),
    $sidebar = $("#sidebar"),
    $resizeSidebar = $("#resize-sidebar"),
    $toggleSidebar = $("#toggle-sidebar");
L.Browser.mobile && L.DomUtil.addClass(document.body, "mobile"), localStorage.resize ? resize(localStorage.resize, !0) : window.innerWidth > 0 && window.innerWidth < 390 && resize(window.innerWidth, !0), localStorage.hideSidebar ? (L.DomUtil.addClass(document.body, "big"), setTooltip($toggleSidebar, "Open sidebar"), L.Browser.mobile && ($toggleSidebar.textContent = "open sidebar")) : (setTooltip($toggleSidebar, "Close sidebar"), L.Browser.mobile && ($toggleSidebar.textContent = "close sidebar")), localStorage.season != Data.season && (localStorage.season = Data.season, localStorage.removeItem("selected"), localStorage.removeItem("opened"));
var overlays = {
        specials: [],
        weeks: []
    },
    selected = {
        specials: {},
        weeks: {}
    },
    opened = {
        specials: {},
        weeks: {}
    };
localStorage.selected && (selected = JSON.parse(localStorage.selected)), localStorage.opened && (opened = JSON.parse(localStorage.opened));
var map = L.map($map, {
    crs: L.CRS.Simple,
    preferCanvas: !0,
    minZoom: -2,
    maxZoom: ~window.location.pathname.indexOf("speedy") ? 6 : 2.5,
    zoomSnap: 0,
    zoomControl: !1,
    attributionControl: !1
});
map.addControl(L.control.attribution({
    position: "bottomright",
    prefix: ""
})), map.attributionControl.addAttribution("Not affiliated with Epic Games"), L.control.zoom({
    position: zoomPosition
}).addTo(map);
var bounds = [
    [0, 0],
    [2048, 2048]
];
map.fitBounds(bounds);
var x = L.imageOverlay("./maps/" + Data.map + (L.Browser.mobile ? "-mobile" : "") + ".jpg", bounds).addTo(map);
if (~location.search.indexOf("?d=")) {
    var xhrDrawing = new XMLHttpRequest;
    xhrDrawing.open("GET", "/drawings/" + getUrlParameter("d") + ".json", !0), xhrDrawing.onload = function() {
        200 === xhrDrawing.status && (json = JSON.parse(xhrDrawing.responseText), each(json.polyline, function(e, t) {
            addDrawLayer("polyline", L.polyline(t.latlng, {
                color: t.color,
                weight: 4
            }), !1)
        }), each(json.polygon, function(e, t) {
            addDrawLayer("polygon", L.polygon(t.latlng, {
                color: t.color,
                fillOpacity: .4,
                weight: 4
            }), !1)
        }), each(json.rectangle, function(e, t) {
            addDrawLayer("rectangle", L.rectangle(t.latlng, {
                color: t.color,
                fillOpacity: .4,
                weight: 4
            }), !1)
        }), each(json.circle, function(e, t) {
            addDrawLayer("circle", L.circle(t.latlng, {
                radius: t.radius,
                color: t.color,
                fillOpacity: .4,
                weight: 4
            }), !1)
        }), each(json.marker, function(e, t) {
            var o = L.marker(t.latlng, {
                icon: new L.divIcon({
                    iconSize: [30, 30],
                    tooltipAnchor: [15, 0],
                    html: '<svg width="30" height="30" viewBox="0 0 24 24" style="fill:' + t.color + ';stroke:#000"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>'
                })
            });
            o.options.color = t.color, t.tooltip && (o.options.tooltip = t.tooltip, o.bindTooltip(escapeHtml(t.tooltip))), addDrawLayer("marker", o, !1)
        }))
    }, xhrDrawing.send()
}
printWeeks("specials"), printWeeks("weeks");
var labels = L.layerGroup();
each(Data.labels, function(e, t) {
    var o = "label";
    t.black && (o += " black"), L.marker(t.coords, {
        icon: L.divIcon({
            className: o,
            html: "<div>" + t.name + "</div>",
            iconSize: null
        })
    }).addTo(labels)
}), map.addLayer(labels);
var drawLayers = new L.FeatureGroup;
map.addLayer(drawLayers);

    
console.log(drawLayers._map._layers) //_latlng

for (var i = drawLayers.length - 1; i >= 0; i++) {
    //Things[i]
    console.log(drawLayers._map._layers[i]._latlng)
}


// each(Data.drawLayers, function (ml) {

    
//     if (map._layers[ml].feature) {

//         console.log(drawLayers._map._layers);
//     }
// });

var openDrawControl = L.Control.extend({
        options: {
            position: "topright"
        },
        onAdd: function(e) {
            var t = L.DomUtil.create("div", "leaflet-bar leaflet-control");
            t.onclick = function(t) {
                t.preventDefault(), labels.clearLayers(), e.addControl(new L.Control.Draw({
                    edit: !1
                })), e.addControl(new saveDrawControl), this.style.display = "none"
            };
            var o = L.DomUtil.create("a", "leaflet-draw-open");
            return o.href = "#", o.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>', t.appendChild(o), o.setAttribute("data-tooltip-right", ""), setTooltip(o, "Draw on map"), t
        }
    }),
    saveDrawControl = L.Control.extend({
        options: {
            position: "topright"
        },
        onAdd: function(e) {
            var t = L.DomUtil.create("div", "leaflet-bar leaflet-control");
            t.onclick = function(e) {
                $(".leaflet-draw-save-input").value = "Saving...", L.DomUtil.addClass($(".leaflet-draw-share"), "opened"), drawLayersExport = {
                    polyline: [],
                    polygon: [],
                    rectangle: [],
                    circle: [],
                    marker: []
                }, drawLayers.eachLayer(function(e) {
                    var t = {
                            color: e.options.color
                        },
                        o = e.options.drawtype;
                    if ("circle" === o) t.radius = e.getRadius(), t.latlng = [e._latlng.lat, e._latlng.lng];
                    else if ("marker" === o) t.latlng = [e._latlng.lat, e._latlng.lng], e.options.color || (t.color = "#feff85"), e.options.tooltip && (t.tooltip = e.options.tooltip);
                    else if ("polyline" === o || "polygon" === o || "rectangle" === o) {
                        var a = [];
                        each("polyline" === o ? e._latlngs : e._latlngs[0], function(e, t) {
                            a.push([t.lat, t.lng])
                        }), t.latlng = a
                    }
                    drawLayersExport[o].push(t)
                });
                var t = new XMLHttpRequest;
                t.open("POST", "/save-draw.php", !0), t.onload = function() {
                    if (200 === t.status) {
                        var e = $(".share-twitter"),
                            o = $(".share-facebook");
                        if (t.responseText) {
                            var a = "www.lootlake.info/?d=" + t.responseText;
                            $(".leaflet-draw-save-input").value = a, e.style.opacity = 1, o.style.opacity = 1, e.style.pointerEvents = "auto", o.style.pointerEvents = "auto", e.href = "https://twitter.com/intent/tweet/?url=https://" + a, o.href = "https://facebook.com/sharer/sharer.php?u=https://" + a
                        } else $(".leaflet-draw-save-input").value = "Please try again later.", e.style.opacity = .5, o.style.opacity = .5, e.style.pointerEvents = "none", o.style.pointerEvents = "none", e.href = "", o.href = ""
                    }
                }, t.setRequestHeader("Content-Type", "application/json"), t.send(JSON.stringify(drawLayersExport))
            };
            var o = L.DomUtil.create("div", "leaflet-draw-share"),
                a = L.DomUtil.create("input", "leaflet-draw-save-input");
            a.readOnly = !0, a.onclick = function(e) {
                e.stopPropagation(), this.setSelectionRange(0, this.value.length)
            }, o.appendChild(a);
            var n = L.DomUtil.create("a", "share-twitter");
            n.target = "_blank", n.innerHTML = '<svg viewBox="0 0 512 512"><path fill="#fff" d="M437 152a72 72 0 0 1-40 12 72 72 0 0 0 32-40 72 72 0 0 1-45 17 72 72 0 0 0-122 65 200 200 0 0 1-145-74 72 72 0 0 0 22 94 72 72 0 0 1-32-7 72 72 0 0 0 56 69 72 72 0 0 1-32 1 72 72 0 0 0 67 50 200 200 0 0 1-105 29 200 200 0 0 0 309-179 200 200 0 0 0 35-37"/></svg>', o.appendChild(n);
            var l = L.DomUtil.create("a", "share-facebook");
            l.target = "_blank", l.innerHTML = '<svg viewBox="0 0 600 612"><path fill="#fff" d="M330 512V322h64l9-74h-73v-47c0-22 6-36 37-36h39V99c-7-1-30-3-57-3-57 0-95 34-95 98v54h-64v74h64v190z"/></svg>', o.appendChild(l), t.appendChild(o);
            var r = L.DomUtil.create("a", "leaflet-draw-save");
            return r.href = "#", r.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"/></svg>', r.onclick = function(e) {
                e.preventDefault()
            }, t.appendChild(r), r.setAttribute("data-tooltip-right", ""), setTooltip(r, "Save my drawing"), t
        }
    });

function addDrawLayer(e, t, o) {
    if (t.options.drawtype = e, drawLayers.addLayer(t), t.on("click", function(o) {
            var a = L.DomUtil.create("div", "draw-icons"),
                n = L.DomUtil.create("div", "draw-icon");
            n.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>', n.onclick = function() {
                map.closePopup(i), t.editing.enable(), "polyline" === e && removeArrows(t), map.on("click", function() {
                    "polyline" === e && addArrows(t), t.editing.disable()
                })
            }, setTooltip(n, "Edit"), a.appendChild(n);
            var l = L.DomUtil.create("div", "draw-icon");
            l.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/></svg>', l.onclick = function() {
                map.closePopup(i), "polyline" === e && removeArrows(t), drawLayers.removeLayer(t)
            }, setTooltip(l, "Delete"), a.appendChild(l);
            var r = L.DomUtil.create("div", "draw-icon");
            r.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 22c0 1.105-.896 2-2 2s-2-.895-2-2 .896-2 2-2 2 .895 2 2zm-12-8c0 1.104.895 2 2 2s2-.896 2-2-.895-2-2-2-2 .896-2 2zm4 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0-12c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm12 12c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-.244-8.679l1.034 1.023-5.52 5.469c-1.017 1.005-1.626.132-2.941 1.023-.177.118-.362.164-.538.155-.437-.027-.806-.406-.776-.886.006-.159.064-.328.171-.499.79-1.257.021-1.914 1.013-2.892l5.491-5.439 1.031 1.024-2.915 2.879 2.188-.128 1.762-1.729zm1.025-5.293c-.036.849-.333 1.218-.719 1.195-.215-.014-.425-.149-.618-.32-.279-.247-.705-.23-.973.036-.289.293-.283.768.01 1.055l3.609 3.569c.292.287.761.286 1.047-.006.265-.27.276-.697.025-.979-.191-.212-.34-.443-.324-.684.021-.35.393-.616 1.185-.659 2.664-.146 3.977-1.699 3.977-3.545 0-2.124-1.666-3.69-3.688-3.69-1.869 0-3.416 1.32-3.531 4.028z"/></svg>', r.onclick = function() {
                for (var e = ["rgb(0, 122, 255)", "rgb(52, 199, 89)", "rgb(162, 132, 94)", "rgb(244, 149, 0)", "rgb(28, 28, 30)", "rgb(175, 82, 222)", "rgb(255, 59, 48)", "rgb(90, 200, 250)", "rgb(255, 204, 0)"], o = L.DomUtil.create("div", "color-picker-container"), a = 0; a < e.length; a++) {
                    var n = L.DomUtil.create("div", "color-picker");
                    n.style.backgroundColor = e[a], n.onclick = function() {
                        var e = this.style.backgroundColor;
                        t._icon ? t._icon.firstChild.style.fill = e : t.setStyle({
                            color: e
                        }), t.options.color = e, map.closePopup(i)
                    }, o.appendChild(n)
                }
                i.setContent(o)
            }, setTooltip(r, "Change color"), a.appendChild(r);
            var i = L.popup().setLatLng(o.latlng).setContent(a).openOn(map)
        }), "polyline" === e && addArrows(t), "marker" === e && o) {
        var a = prompt("Set the marker text: ");
        a && (t.bindTooltip(escapeHtml(a)), t.options.tooltip = a)
    }
}
map.on("draw:created", function(e) {
    addDrawLayer(e.layerType, e.layer, !0)
});
var arrowLayers = {};

function addArrows(e) {
    var t = e._leaflet_id;
    arrowLayers[t] || (arrowLayers[t] = L.layerGroup().addTo(map)), arrowLayers[t].clearLayers();
    for (var o = e._latlngs, a = 0; a + 1 < o.length; a++) {
        var n = o[a + 1].lat - o[a].lat,
            l = o[a + 1].lng - o[a].lng,
            r = [o[a].lat + n / 2, o[a].lng + l / 2],
            i = 360 - 57.295779513082 * Math.atan2(n, l),
            s = {
                className: "arrowIcon",
                iconSize: [22, 22],
                iconAnchor: [11, 11],
                html: '<svg width="22" height="22" viewBox="0 0 24 24" transform="rotate(' + i + ')"><path fill="#fff" stroke="#000" d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z"/></svg>'
            };
        new L.marker(r, {
            icon: new L.divIcon(s)
        }).addTo(arrowLayers[t]).options = {
            drawtype: "arrow",
            angle: i
        }, arrowLayers[t].options = {
            drawtype: "arrows"
        }
    }
}

function removeArrows(e) {
    var t = e._leaflet_id;
    arrowLayers[t] && arrowLayers[t].clearLayers()
}
map.addControl(new openDrawControl), each($$(".countdown"), function(e, t) {
    var o = Number(t.getAttribute("data-until")),
        a = function() {
            var e = o - Date.now(),
                a = (Math.floor(e / 1e3 % 60), Math.floor(e / 1e3 / 60 % 60)),
                n = Math.floor(e / 36e5 % 24),
                l = Math.floor(e / 864e5);
            if (e < 6e4) t.parentNode.parentNode.parentNode.style.display = "none";
            else {
                var r = "⏱️ ";
                l > 0 && (r += l + "D "), n > 0 && (r += n + "H "), a > 0 && (r += a + "M "), t.innerHTML = r
            }
        };
    a(), setInterval(a, 6e4)
}), $resizeSidebar.addEventListener("mousedown", startDrag), $resizeSidebar.addEventListener("touchstart", startDrag), document.addEventListener("mouseup", endDrag), document.addEventListener("touchend", endDrag), $toggleSidebar.addEventListener("click", function() {
    L.DomUtil.hasClass(document.body, "big") ? (L.DomUtil.removeClass(document.body, "big"), localStorage.removeItem("hideSidebar"), setTooltip(this, "Close sidebar"), L.Browser.mobile && (this.textContent = "close sidebar")) : (L.DomUtil.addClass(document.body, "big"), localStorage.hideSidebar = 1, setTooltip(this, "Open sidebar"), L.Browser.mobile && (this.textContent = "open sidebar")), map.invalidateSize(), map.fitBounds(bounds)
}), "?dev" === location.search && ($(".leaflet-container").style.cursor = "default", map.on("click", function(e) {
    copyToClipboard("[" + e.latlng.lat.toFixed(3) + ", " + e.latlng.lng.toFixed(3) + "]")
})), localStorage.lastSeen = Date.now();