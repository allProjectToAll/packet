import packetHallCn from './packetHall/cn'
import sendPacketCn from './sendPacket/cn'
import drawPacketCn from './drawPacket/cn'
import sendProjectPacket from './sendProjectPacket/cn'
import redInfo from './redInfo/cn'
import appDownload from './appDownload/cn'

const cn = {
  message: {
    drawPacketTitle:'领取红包',
    packetHallTitle:'红包大厅',
    sendPacketTitle:'发红包',
    wealPacketTitle:'福利红包',
    packetDetailTitle:'红包详情',
    mypacketTitle:'我的红包',
    nextStep:'下一步',
    loadMoreBtnText:'点击加载更多',
    appDonwloadTitle:'下载App',
    confirmTip:'提示',
    pullDownRefreshText:'下拉刷新',
    dropRefreshText:'释放更新',
    loadingText:'加载中...',
    pullUpRefreshText:'加载更多',
  },
  verifyCode:{
    googlePopTitle:'谷歌验证',
    googleCodeSendTip1:'谷歌验证器丢失？',
    googleCodeSendTip2:'请登录官网认证，',
    googleCodeSendTip3:' 提交工单',
    googleWebSiteTip:'www.azex.io',
    phonePopTitle:'手机短信验证',
    emailPopTitle:'邮箱验证',
    codeSendTip:'验证码已发送至',
    phoneCodeLabel:'6 位验证码',
    emailCodeLabel:'6 位验证码',
    googleCodeLabel:'谷歌验证码',
    resendBtnText:'重新发送',
  },
  dialogPacket:{
    isCreating:"等待红包生成中…",
    backCash:"如果未能成功生成红包，资金将退回您的资产，您可以尝试重新发布",
    packetError:"红包生成失败",
    cashBackCash:"资金将退回到您的资产，请耐心等待 您也可以重新发布",
    sendAgain:"重新发布",
    hardToCreat:"努力生成红包中...",
    loadForBack:"可能还需要再等待几分钟，稍后您可在“我发布的红包”中查看。如果未能成功生成红包，资金会退回您的帐户",
    checkMySend:"查看我发布的红包",
  },
  smartCaptcha:{//人机验证
    "clickButtonToValidate":"点击按钮开始智能验证",
    "ValidateSuccess": "验证成功",
    "ValidateErrorToRefresh": "验证失败，请在此点击按钮刷新",
    "noopsyche": "智能检测中",
  },
  ...packetHallCn,
  ...sendPacketCn,
  ...drawPacketCn,
  ...sendProjectPacket,
  ...redInfo,
  ...appDownload
}
export default cn;
