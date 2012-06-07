package creatures

fun v(x: Double, y: Double) = Vector(x, y)

class Vector(val x: Double = 0.0, val y: Double = 0.0) {
    fun plus(v: Vector) = v(x + v.x, y + v.y)
    fun minus() = v(- x, - y)
    fun minus(v: Vector) = v(x - v.x, y - v.y)
    fun times(koef: Double) = v(x * koef, y * koef)
    fun distanceTo(v: Vector) = Math.sqrt((this - v).sqr)
    fun rotatedBy(theta: Double): Vector {
        val sin = Math.sin(theta)
        val cos = Math.cos(theta)
        return v(x * cos - y * sin, x * sin + y * cos)
    }

    fun isInRect(topLeft: Vector, size: Vector) = (x in topLeft.x..topLeft.x + size.x) &&  (y in topLeft.y..topLeft.y + size.y)

    val sqr: Double
        get() = x * x + y * y
    val normalized: Vector
        get() = this * (1.0 / Math.sqrt(sqr))
}