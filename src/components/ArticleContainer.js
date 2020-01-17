// import React from 'react';
//   // { Fragment }
  
// import PropTypes from 'prop-types';
// // import ReactMarkdown from 'react-markdown';
// // import styled from 'styled-components';

// // import EditMode from './EditMode';
// import ArticleFooter from './ArticleFooter';

// // const ErrorMessageBox = styled.span`
// //   margin-left: 10px;
// //   font-size: 16px;
// //   color: red;
// // `;


// export default function ArticleContainer(props) {
//   const { history, id, title, content, modifiedTime, animate, ableEdit, editArticle, handleChangeTitle, cancelEdit, submitEdit, onChange, showBtn, errorMessage } = props;
//   return (
//     <div className={`ArticleContainer ${animate ? 'hover-effect fade-in' : '' }`} onClick={ animate ? () => { history.push(`/article/${id}`) } : () => {} }>
//       <div className="ArticleContent">
//         <div className="title">
//           { !ableEdit && title}
//           { showBtn &&
//             <Fragment>
//               { !ableEdit && <div className="btn" onClick={() => { editArticle(id); }}>edit</div>}
//               { ableEdit &&
//                 <div>
//                   <input type="text" value={title} onChange={handleChangeTitle} />
//                   { errorMessage && <ErrorMessageBox>{errorMessage}</ErrorMessageBox>}
//                   <div className="btn" onClick={() => { cancelEdit(); }}>cancel</div>
//                   <div className="btn" onClick={() => { submitEdit(id); }}>done</div>
//                 </div>
//               }
//             </Fragment>
//           }
//         </div>
//         { !ableEdit && <ReactMarkdown className="padding-10" source={content} />}
//         { ableEdit && <EditMode content={content} onChange={onChange} />} 
//       </div>
//       <ArticleFooter modifiedTime={modifiedTime} />
//     </div>
//   );
// }

// // const ArticleContainerHoc = ChildComponent => {
// //   console.log(ChildComponent)
// //   class ComposedComponent extends React.Component {
// //     render() {
// //       const { animate, history, id, modifiedTime } = this.props;
// //       return (
// //         <div className={`ArticleContainer ${animate ? 'hover-effect fade-in' : '' }`} onClick={ animate ? () => { history.push(`/article/${id}`) } : () => {} }>
// //           <ChildComponent {...this.props} />;
// //           <ArticleFooter modifiedTime={modifiedTime} />
// //         </div>
// //       );
// //     }
// //   }

// //   return ComposedComponent;
// // }

// ArticleContainer.defaultProps = {
//   animate: false,
//   showBtn: false,
//   editArticle: () => { },
//   handleChangeTitle: () => { },
//   cancelEdit: () => { },
//   submitEdit: () => { },
//   onChange: () => { },
// };

// ArticleContainer.propTypes = {
//   animate: PropTypes.bool,
//   showBtn: PropTypes.bool,
//   editArticle: PropTypes.func,
//   handleChangeTitle: PropTypes.func,
//   cancelEdit: PropTypes.func,
//   submitEdit: PropTypes.func,
//   onChange: PropTypes.func,
// };

// // export default ArticleContainer;