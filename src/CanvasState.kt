package creatures

import js.dom.html5.CanvasContext
import js.jquery.*
import js.dom.html5.CanvasGradient
import js.dom.html5.HTMLCanvasElement
import java.util.ArrayList
import js.dom.html.window
import js.dom.html.HTMLElement
import js.dom.html.HTMLImageElement

class CanvasState(val canvas: HTMLCanvasElement) {
    var width = canvas.width
    var height = canvas.height
    val size: Vector
        get() = v(width, height)
    val context = creatures.context
    var valid = false
    var shapes = ArrayList<Shape>()
    var selection: Shape? = null
    var dragOff = Vector()
    val interval = 1000 / 30

    {
        jq(canvas).mousedown {
            valid = false
            selection = null
            val mousePos = mousePos(it)
            for (shape in shapes) {
                if (mousePos in shape) {
                    dragOff = mousePos - shape.pos
                    shape.selected = true
                    selection = shape
                    break
                }
            }
        }

        jq(canvas).mousemove {
            if (selection != null) {
                selection!!.pos = mousePos(it) - dragOff
                valid = false
            }
        }

        jq(canvas).mouseup {
            if (selection != null) {
                selection!!.selected = false
            }
            selection = null
            valid = false
        }

        jq(canvas).dblclick {
            val newCreature = Creature(mousePos(it), this @CanvasState)
            addShape(newCreature)
            valid = false
        }

        window.setInterval({
            draw()
        }, interval)
    }

    fun mousePos(e: MouseEvent): Vector {
        var offset = Vector()
        var element: HTMLElement? = canvas
        while (element != null) {
            val el: HTMLElement = element!!
            offset += Vector(el.offsetLeft, el.offsetTop)
            element = el.offsetParent
        }
        return Vector(e.pageX, e.pageY) - offset
    }

    fun addShape(shape: Shape) {
        shapes.add(shape)
        valid = false
    }

    fun clear() {
        context.fillStyle = "#FFFFFF"
        context.fillRect(0, 0, width, height)
        context.strokeStyle = "#000000"
        context.lineWidth = 4.0
        context.strokeRect(0, 0, width, height)
    }

    fun draw() {
        if (valid) return

        clear()
        for (shape in shapes.reversed()) {
            shape.draw(this)
        }
        Kotlin.draw(this)
        valid = true
    }
}