package creatures

import js.dom.html5.CanvasContext
import js.dom.html.*
import java.util.ArrayList

class RadialGradientGenerator(val context: CanvasContext) {
    val gradients = ArrayList<Array<Pair<Double, String>>>()
    var current = 0

    fun newColorStops(vararg colorStops: Pair<Double, String>) {
        gradients.add(colorStops)
    }

    {
        newColorStops(Pair(0.0, "#F59898"), Pair(0.5, "#F57373"), Pair(1.0, "#DB6B6B"))
        newColorStops(Pair(0.39, "rgb(140,167,209)"), Pair(0.7, "rgb(104,139,209)"), Pair(0.85, "rgb(67,122,217)"))
        newColorStops(Pair(0.0, "rgb(255,222,255)"), Pair(0.5, "rgb(255,185,222)"), Pair(1.0, "rgb(230,154,185)"))
        newColorStops(Pair(0.0, "rgb(255,209,114)"), Pair(0.5, "rgb(255,174,81)"), Pair(1.0, "rgb(241,145,54)"))
        newColorStops(Pair(0.0, "rgb(132,240,135)"), Pair(0.5, "rgb(91,240,96)"), Pair(1.0, "rgb(27,245,41)"))
        newColorStops(Pair(0.0, "rgb(250,147,250)"), Pair(0.5, "rgb(255,80,255)"), Pair(1.0, "rgb(250,0,217)"))
    }

    fun getNext(): Array<Pair<Double, String>> {
        val result = gradients.get(current)
        current = (current + 1) % gradients.size()
        return result
    }
}

fun loadImage(path: String): HTMLImageElement {
    val image = window.document.createElement("img") as HTMLImageElement
    image.src = path
    return image
}

public class Pair<A, B> (
        public val first: A,
        public val second: B
) {
    public fun component1(): A = first
    public fun component2(): B = second

    public fun toString(): String = "($first, $second)"

}