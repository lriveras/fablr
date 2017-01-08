const closePostDialog = () => {
  return {
    type: 'CLOSE_POST_DIALOG',
    postDialog: false
  }
};

const openPostDialog = () => {
  return {
    type: 'OPEN_POST_DIALOG',
    postDialog: true,
    pdLoading: true,
    pdPage: {},
    pdText: "",
    pdDate: {},
    pdTime: {},
    pdValid: false,
    pdPosting: false,
    pdPost: {},
    myPages: [],
    pdScheduled: false,
    pdPageError: false,
    pdTextError: false,
    pdDateError: false,
    pdTimeError: false
  }
};

const myPagesLoaded = (pages) => {
  return {
    type: 'MY_PAGES_LOADED',
    myPages: pages,
    pdLoading: false 
  }
};

const pageSelected = (page) => {
  return {
    type: 'PAGE_SELECTED',
    pdPage: page 
  }
};

const toggleScheduling = (currentVal) => {
  return {
    type: 'TOGGLE_SCHEDULING',
    pdScheduled: !currentVal 
  }
};

const postTextChanged = (text) => {
  return {
    type: 'POST_TEXT_CHANGED',
    pdText: text 
  }
};

const postLinkChanged = (link) => {
  return {
    type: 'POST_LINK_CHANGED',
    pdLink: link 
  }
};

const postDateChanged = (date) => {
  return {
    type: 'POST_DATE_CHANGED',
    pdDate: date 
  }
};

const postTimeChanged = (time) => {
  return {
    type: 'POST_TIME_CHANGED',
    pdTime: time 
  }
};

const posting = () => {
  return {
    type: 'POSTING',
    pdPosting: true,
    pdErrorMessage: ""
  }
};

const posted = (post) => {
  return {
    type: 'POSTED',
    pdPost: post,
    postDialog: false,
    pdPosting: false 
  }
}

const postError = (pdErrorMessage) => {
  return {
    type: 'POST_ERROR',
    pdErrorMessage,
    pdPosting: false,
  }
};

const dismissPostError = () => {
  return {
    type: 'DISMISS_POST_ERROR',
    pdErrorMessage: "",
    pdPost: {}
  }
};

const formValidated = (pdErrorMessage, pdPageError, pdTextError, pdLinkError, pdDateError, pdTimeError) => {
  return {
    type: 'FORM_VALIDATED',
    pdErrorMessage: pdErrorMessage,
    pdPageError,
    pdTextError,
    pdLinkError,
    pdDateError,
    pdTimeError
  }
};

export { closePostDialog, openPostDialog, myPagesLoaded,
    pageSelected, postTextChanged, 
    postDateChanged, postTimeChanged, 
    posting, posted, toggleScheduling, postError, dismissPostError, formValidated, postLinkChanged };