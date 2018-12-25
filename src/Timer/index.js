export default class Timer {
  constructor (fpsCap, learnRate, ctx) {
    this.averageFrameRate = 0
    this.lastFrameBeginTime = 0
    this.deltaCap = 1000 / fpsCap
    this.shouldDelay = 0
    this.learnRate = learnRate || 0.05
    this.ctx = ctx
  }

  beginFrame () {
    this.frameBeginTime = new Date().getTime()
  }
  endFrame () {
    this.frameEndTime = new Date().getTime()

    let innerDeltaTime = this.frameEndTime - this.frameBeginTime
    let outerDeltaTime = this.frameBeginTime - this.lastFrameBeginTime
    let currentFrameRate = 1000 / outerDeltaTime

    this.lastFrameBeginTime = this.frameBeginTime
    this.averageFrameRate =
      this.averageFrameRate * (1 - this.learnRate) +
      currentFrameRate * this.learnRate
    this.shouldDelay = this.deltaCap - innerDeltaTime
    if (this.shouldDelay < 0) this.shouldDelay = 0
  }
}
