-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-07-17 10:46:51
-- 服务器版本： 5.5.56-log
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidu_news`
--
CREATE DATABASE IF NOT EXISTS `baidu_news` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `baidu_news`;

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `news_type_id` bigint(20) NOT NULL,
  `news_title` varchar(200) NOT NULL,
  `news_img_url` varchar(200) NOT NULL,
  `created_on` datetime NOT NULL,
  `news_source` varchar(200) NOT NULL,
  `updated_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `news_type_id`, `news_title`, `news_img_url`, `created_on`, `news_source`, `updated_on`) VALUES
(1, 1, '特朗普“撇清”通俄门:若希拉里当选对普京更有利', '../image/news_01_01.JPEG', '2017-07-12 13:13:19', '特朗普', '2017-07-14 10:14:21'),
(2, 1, '法媒：旅途变囧途 中国游客在法国被抓在德国被抢', '../image/news_02_01.JPEG', '2017-07-13 14:57:38', '法国', '2017-07-13 14:57:38'),
(3, 1, '谷歌法国11.2亿欧元逃税案落幕：法院驳回指控', '../image/news_03_01.JPEG', '2017-07-13 15:53:12', '欧元区', '2017-07-13 15:53:12'),
(4, 1, '墨西哥一伙匪徒袭击警察 造成5人死亡', '../image/news_04_01.JPEG', '2017-07-13 15:53:12', '墨西哥', '2017-07-16 14:33:45'),
(38, 2, '成都小伙伴们注意！暴雨携8级短时阵性大风来袭 暂停露天集体活动', '../image/news_05_01.JPEG', '2017-07-16 14:50:11', '暴雨', '2017-07-17 07:39:06'),
(39, 2, '“为爱而战，跑步向前”战跑SoldierGo在北京世葡园举行', '../image/news_06_01.JPEG', '2017-07-16 15:08:14', '跑步', '2017-07-17 07:38:58'),
(40, 2, '新疆喀什、和田地区882名城乡富余劳动力将转移至建筑企业就业', '../image/news_07_01.JPEG', '2017-07-16 15:09:13', '建筑', '2017-07-17 07:38:55'),
(41, 2, '商学院职场协会暑期社会实践团走访小型产业户', '../image/news_05_01.JPEG', '2017-07-16 15:13:04', '商学院', '2017-07-17 07:38:51'),
(42, 3, '国际元老邀请赛落幕，法国击败丹麦夺得冠军', '../image/news_09_01.PNG', '2017-07-16 15:15:11', '丹麦', '2017-07-17 07:38:47'),
(43, 3, '麦科勒姆晒安东尼身披开拓者球衣照', '../image/news_10_01.JPEG', '2017-07-16 15:16:02', '安东尼', '2017-07-17 07:38:43'),
(45, 1, '阿森纳中国行厄齐尔秀功夫 吉鲁被茶道折服', '../image/news_11_01.JPEG', '2017-07-17 08:54:51', '吉鲁', '2017-07-17 08:54:51'),
(46, 1, 'C罗将来华观战中超榜首大战 发文称已迫不及待', '../image/news_12_01.JPEG', '2017-07-17 08:56:06', '罗纳尔多', '2017-07-17 09:10:23');

-- --------------------------------------------------------

--
-- 表的结构 `news_type`
--

DROP TABLE IF EXISTS `news_type`;
CREATE TABLE IF NOT EXISTS `news_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `news_type_name` varchar(200) NOT NULL,
  `created_on` date NOT NULL,
  `updated_on` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news_type`
--

INSERT INTO `news_type` (`id`, `news_type_name`, `created_on`, `updated_on`) VALUES
(1, '国际', '2017-07-11', '2017-07-11'),
(2, '国内', '2017-07-12', '2017-07-12'),
(3, '体育', '2017-07-12', '2017-07-12'),
(4, '娱乐', '2017-07-12', '2017-07-12'),
(5, '财经', '2017-07-17', '2017-07-17'),
(6, '科技', '2017-07-17', '2017-07-17'),
(7, '房产', '2017-07-17', '2017-07-17'),
(8, '时尚', '2017-07-17', '2017-07-17'),
(9, '旅游', '2017-07-17', '2017-07-17'),
(10, '游戏', '2017-07-17', '2017-07-17');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
