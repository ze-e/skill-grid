
export function drawLine (from, to, line) {
  if (!from || !to || !line) return
  const fT = from.offsetTop + from.offsetHeight / 2
  const tT = to.offsetTop + to.offsetHeight / 2
  const fL = from.offsetLeft + from.offsetWidth / 2
  const tL = to.offsetLeft + to.offsetWidth / 2

  const CA = Math.abs(tT - fT)
  const CO = Math.abs(tL - fL)
  const H = Math.sqrt(CA * CA + CO * CO)
  let ANG = 180 / Math.PI * Math.acos(CA / H)
  let top
  let left

  if (tT > fT) {
    top = (tT - fT) / 2 + fT
  } else {
    top = (fT - tT) / 2 + tT
  }
  if (tL > fL) {
    left = (tL - fL) / 2 + fL
  } else {
    left = (fL - tL) / 2 + tL
  }

  if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
    ANG *= -1
  }
  top -= H / 2

  line.style['-webkit-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-moz-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-ms-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-o-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-transform'] = 'rotate(' + ANG + 'deg)'
  line.style.top = top + 'px'
  line.style.left = left + 'px'
  line.style.height = H + 'px'
}

export function drawAvatar ({ body, head, hand, foot, gear }) {
  if (gear !== null) Object.keys(gear).forEach((k) => gear[k] == null && delete gear[k])

  // load
  const bodyImg = new Image()
  bodyImg.src = body.src

  const headImg = new Image()
  headImg.src = head.src

  const lHandImg = new Image()
  lHandImg.src = hand.l_src

  const rHandImg = new Image()
  rHandImg.src = hand.r_src

  const lFootImg = new Image()
  lFootImg.src = foot.l_src

  const rFootImg = new Image()
  rFootImg.src = foot.r_src

  // build
  bodyImg.onload = () => {
    buildImage()
  }

  headImg.onload = () => {
    buildImage()
  }

  lHandImg.onload = () => {
    buildImage()
  }

  rHandImg.onload = () => {
    buildImage()
  }

  lFootImg.onload = () => {
    buildImage()
  }

  rFootImg.onload = () => {
    buildImage()
  }

  const gearImg = []

  if (gear !== null) {
    gear.forEach(item => {
      const itemImg = new Image()
      itemImg.src = item.src
      gearImg.push(itemImg)
      itemImg.onload = () => {
        buildImage()
      }
    })
  }

  function buildImage () {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 400

    ctx.drawImage(bodyImg, 0, 0)
    ctx.drawImage(headImg, 0, 0)
    ctx.drawImage(lHandImg, 0, 0)
    ctx.drawImage(rHandImg, 0, 0)
    ctx.drawImage(lFootImg, 0, 0)
    ctx.drawImage(rFootImg, 0, 0)
    if (gear !== null) {
      gearImg.forEach(img => {
        ctx.drawImage(img, 0, 0)
      })
    }
  }
}
