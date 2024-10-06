
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { images } from "../../assets/images"
import { useEffect } from "react"

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

const ProductSlider = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    resizeObserver: true,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
      resizeObserver: true,
    },
    [ThumbnailPlugin(instanceRef)]
  )

  useEffect(() => {
    if (instanceRef?.current) {
      console.log("Keen slider instance:", instanceRef.current)
    }
  }, [instanceRef])

  return (
    <div className="flex flex-col gap-4 max-w-[600px] ">
      <div ref={sliderRef} className="keen-slider border-[0.5px] rounded-2xl aspect-[9/10]">
        {Array.from({ length: 5 }).map(index => (
          <img
            key={index}
            src={images.ring}
            width={600}
            height={600}
            className="keen-slider__slide aspect-[9/10] w-full h-auto object-cover min-w-full"
          />
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {Array.from({ length: 5 }).map(index => (
          <img
            key={index}
            src={images.ring}
            width={600}
            height={600}
            className="keen-slider__slide aspect-square w-full h-full"
          />
        ))}
      </div>
    </div>
  )
}

export default ProductSlider