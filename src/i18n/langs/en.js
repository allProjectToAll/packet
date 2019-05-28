import packetHallEn from './packetHall/en'
import sendPacketEn from './sendPacket/en'
import drawPacketEn from './drawPacket/en'
import sendProjectPacket from './sendProjectPacket/en'
import redInfo from './redInfo/en'
import appDownload from './appDownload/en'

const en = {
  message: {
    drawPacketTitle:'Open Red Packet',
    packetHallTitle:'Packet',
    sendPacketTitle:'Send Red Packet',
    wealPacketTitle:'Red Packet With Bonus',
    packetDetailTitle:'Details',
    mypacketTitle:'My Packet',
    nextStep:'Next',
    loadMoreBtnText:'Click to learn more',
    appDonwloadTitle:'Donwload App',
    confirmTip:'Notice',
    pullDownRefreshText:'Refresh',
    dropRefreshText:'Release Refresh',
    loadingText:'Loading...',
    pullUpRefreshText:'Load More',
  },
  verifyCode:{
    googlePopTitle:'Google Authentication',
    googleCodeSendTip1:'Google authenticator get lost?',
    googleCodeSendTip2:'Please log in website to submit certification，',
    googleCodeSendTip3:' Submit request',
    googleWebSiteTip:'www.azex.io',
    phonePopTitle:'SMS Verification',
    emailPopTitle:'Email Verification',
    codeSendTip:'Verification code has been sent to',
    phoneCodeLabel:'6 digits verification code',
    emailCodeLabel:'6 digits verification code',
    googleCodeLabel:'Google authentication code',
    resendBtnText:'Regain',
  },
  dialogPacket: {
    isCreating: "The red packet is being sent...",
    backCash: "If red packet sending fails, the amount will be refunded to your asset, and you can try to resend.",
    packetError: "Red packet sending failed",
    cashBackCash: "Please wait, the amount will be refunded to your asset, and you can try to resend",
    sendAgain: "Resend",
    hardToCreat: "The red packet is being sent...",
    loadForBack: "It may take a few minutes, and later you can check the red packets sent. If the sending fails, the amount will be refunded to your asset.",
    checkMySend: "Chenk the red packets already sent",
  },
  smartCaptcha:{//Man-machine verification
    "clickButtonToValidate":"Start smart verification",
    "ValidateSuccess": "Successful",
    "ValidateErrorToRefresh": " Verification failed, please click to refresh",
    "noopsyche": "Verifying",
  },
  ...packetHallEn,
  ...sendPacketEn,
  ...drawPacketEn,
  ...sendProjectPacket,
  ...redInfo,
  ...appDownload
}
export default en;
