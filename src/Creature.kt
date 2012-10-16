package creatures

import js.dom.html5.*

class Creature(override var pos: Vector, val state: CanvasState): Shape() {

    val shadowOffset = v(-5.0, 5.0)
    val colorStops = gradientGenerator!!.getNext()
    val relSize = 0.05
    val radius: Double
        get() = state.width * relSize
    val position: Vector
        get() = if (selected) pos - shadowOffset else pos
    val directionToLogo: Vector
        get() = (Kotlin.centre - position).normalized

    override fun contains(mousePos: Vector) = pos distanceTo mousePos < radius

    fun CanvasContext.circlePath(position: Vector, rad: Double) {
        arc(position.x, position.y, rad, 0.0, 2 * Math.PI, false)
    }

    fun CanvasContext.fillCircle(position: Vector, rad: Double) {
        beginPath()
        circlePath(position, rad)
        closePath()
        fill()
    }

    override fun draw(state: CanvasState) {
        val context = state.context
        if (!selected) {
            drawCreature(context)
        } else {
            drawCreatureWithShadow(context)
        }
    }

    fun drawCreature(context: CanvasContext) {
        context.fillStyle = getGradient(context)
        context.beginPath()
        context.circlePath(position, radius)
        tailPath(context)
        context.closePath()
        context.fill()
        drawEye(context)
    }

    fun getGradient(context: CanvasContext): CanvasGradient {
        val gradientCentre = position + directionToLogo * (radius / 4)
        val gradient = context.createRadialGradient(gradientCentre.x, gradientCentre.y, 1.0, gradientCentre.x, gradientCentre.y, 2 * radius)!!
        for (colorStop in colorStops) {
            gradient.addColorStop(colorStop.first, colorStop.second)
        }
        return gradient
    }

    fun tailPath(context: CanvasContext) {
        val tailDirection = - directionToLogo
        val tailPos = position + tailDirection * radius * 1.0
        val tailSize = radius * 1.6
        val angle = Math.PI / 6.0
        val p1 = tailPos + tailDirection.rotatedBy(angle) * tailSize
        val p2 = tailPos + tailDirection.rotatedBy(- angle) * tailSize
        val middlePoint = position + tailDirection * radius * 1.0
        context.moveTo(tailPos.x, tailPos.y)
        context.lineTo(p1.x, p1.y)
        context.quadraticCurveTo(middlePoint.x, middlePoint.y, p2.x, p2.y)
        context.lineTo(tailPos.x, tailPos.y)
    }

    fun drawEye(context: CanvasContext) {
        val eyePos = directionToLogo * radius * 0.6 + position
        val eyeRadius = radius / 3
        val eyeLidRadius = eyeRadius / 2
        context.fillStyle = "#FFFFFF"
        context.fillCircle(eyePos, eyeRadius)
        context.fillStyle = "#000000"
        context.fillCircle(eyePos, eyeLidRadius)
    }

    fun drawCreatureWithShadow(context: CanvasContext) {
//        context.shadowed(shadowOffset, 0.7) {
            context.fillStyle = getGradient(context)
            context.beginPath()
            context.circlePath(position, radius)
            tailPath(context)
            context.closePath()
            context.fill()
//        }
        drawEye(context)
    }
}