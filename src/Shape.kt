package creatures

import js.dom.html5.CanvasContext

abstract class Shape() {

    abstract fun draw(state: CanvasState)
    abstract fun contains(mousePos: Vector): Boolean
    abstract var pos: Vector

    var selected: Boolean = false

    // a couple of helper extension methods we'll be using in the derived classes
    fun CanvasContext.shadowed(shadowOffset: Vector, alpha: Double, render: CanvasContext.() -> Unit) {
        save()
        shadowColor = "rgba(100, 100, 100, $alpha)"
        shadowBlur = 5.0
        shadowOffsetX = shadowOffset.x
        shadowOffsetY = shadowOffset.y
        render()
        restore()
    }

    fun CanvasContext.fillPath(constructPath: CanvasContext.() -> Unit) {
        beginPath()
        constructPath()
        closePath()
        fill()
    }
}
