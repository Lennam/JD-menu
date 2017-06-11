function sameSymbol (a, b) {
    return (a ^ b) >= 0
}

function vector(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

function crossProduct (v1, v2) {
    return v1.x * v2.y - v2.x * v1.y
}

function inTraingle (p, a, b, c) {
    var pa = vector(p, a)
    var pb = vector(p, b)
    var pc = vector(p, c)

    var t1 = crossProduct(pa, pb)
    var t2 = crossProduct(pb, pc)
    var t3 = crossProduct(pc, pa)
    return sameSymbol(t1, t2) && sameSymbol(t2, t3)
}

function needTimer(elem, lastMouseXYZ, nowMouseXYZ) {
    var offset = elem.offset()

    var topLeft = {
        x: offset.left,
        y: offset.top
    }

    var bottomLeft = {
        x: offset.left,
        y: offset.top + elem.height()
    }

    return inTraingle(nowMouseXYZ, lastMouseXYZ, topLeft, bottomLeft)

}