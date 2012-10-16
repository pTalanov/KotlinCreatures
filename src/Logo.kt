package creatures

val Kotlin = Logo(v(250.0, 75.0))

class Logo(override var pos: Vector): Shape()
{
    val relSize: Double = 0.25
    val shadowOffset = v(- 3.0, 3.0)
    val imageSize = v(377.0, 393.0)
    var size: Vector = imageSize * relSize
    val position: Vector
        get() = if (selected) pos - shadowOffset else pos


    fun drawLogo(state: CanvasState) {
        size = imageSize * (state.size.x / imageSize.x) * relSize
        state.context.drawImage(loadImage("http://kotlin-demo.jetbrains.com/static/images/kotlinlogowobackground.png"), 0, 0,
                imageSize.x, imageSize.y,
                position.x, position.y,
                size.x, size.y)
    }

    override fun draw(state: CanvasState) {
        val context = state.context
        if (selected) {
            // using helper we defined in Shape class
            //TODO uncomment when KT-2740 fixed
//            context.shadowed(shadowOffset, 0.2) {
                drawLogo(state)
//            }
        } else {
            drawLogo(state)
        }
    }

    override fun contains(mousePos: Vector): Boolean = mousePos.isInRect(pos, size)

    val centre: Vector
        get() = pos + size * 0.5
}