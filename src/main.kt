package creatures

import js.dom.html5.CanvasContext
import js.jquery.*
import js.dom.html5.CanvasGradient
import js.dom.html5.HTMLCanvasElement
import java.util.ArrayList
import java.util.List
import js.dom.html.window
import js.dom.html.HTMLElement
import js.dom.html.HTMLImageElement

val canvas: HTMLCanvasElement
    get() {
        return window.document.getElementsByTagName("canvas").item(0)!! as HTMLCanvasElement
    }

val context: CanvasContext
    get() {
        return canvas.getContext("2d")!!
    }


val gradientGenerator: RadialGradientGenerator? = null
    get() {
        if ($gradientGenerator == null) {
            $gradientGenerator = RadialGradientGenerator(context)
        }
        return $gradientGenerator
    }


fun main(args: Array<String>) {
    jq {
        val state = CanvasState(canvas)
        state.addShape(Kotlin)
        state.addShape(Creature(state.size * 0.25, state))
        state.addShape(Creature(state.size * 0.75, state))
        window.setTimeout({
            state.valid = false
        }, 1000)
    }
}

fun <T> List<T>.reversed(): List<T> {
    val result = ArrayList<T>()
    var i = size()
    while (i > 0) {
        result.add(get(--i))
    }
    return result
}