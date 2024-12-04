import { FaProjectDiagram, FaFileAlt, FaClipboardList, FaCog, FaSearch, FaBell, FaCalendarAlt, FaTasks} from 'react-icons/fa';

// 좌측 메뉴바 데이터
export const menuData = [
  { id: 1, label: '프로젝트', icon: <FaProjectDiagram />, route: '/main', activeColor: '#E65F2B' },
  { id: 2, label: '제안서', icon: <FaFileAlt />, route: '/proposal', activeColor: '#FF90AC' },
  { id: 3, label: '기획서', icon: <FaClipboardList />, route: '/plan', activeColor: '#68CF34' },
  { id: 4, label: '설계서', icon: <FaCog />, route: '/design', activeColor: '#D98A29' },
  { id: 5, label: '결과 보고서', icon: <FaSearch />, route: '/report', activeColor: '#339ADE' },
  { id: 6, label: '일정 관리', icon: <FaCalendarAlt />, route: '/schedule', activeColor: '#BF00FF' },
  { id: 7, label: '요구분석', icon: <FaTasks />, route: '/requirement', activeColor: '#1ABC9C' },
  { id: 8, label: '공지사항', icon: <FaBell />, route: '/announcement', activeColor: '#dc3545' },
];


// 내용 안에 상단 Tabs 데이터
export const tabs = [
  { name: '주요 내용',  route: ' ', count: 10 },
  { name: '제출',  route: 'submit', count: 5 },
];


export const mainTabs = [
  { name: '프로젝트 개요', route: ' ', count: 1 },
  { name: '프로젝트 좋은점', route: 'benefit', count: 1 },
  { name: '프로젝트 방법', route: 'method', count: 1 },
  // { name: '학습 동영상', route: 'video', count: 1 },
];
