/*
 * JasperReports - Free Java Reporting Library.
 * Copyright (C) 2001 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is part of JasperReports.
 *
 * JasperReports is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JasperReports is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with JasperReports. If not, see <http://www.gnu.org/licenses/>.
 */
package net.sf.jasperreports.samples.chartthemes;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRCsvDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

/**
 * @author Massimo Rabbi (mrabbi@users.sourceforge.net)
 */
public class ChartThemesUtil {
	
	private static String DATAFILES_PATH_PREFIX = ChartThemesUtil.class.getProtectionDomain().getCodeSource().getLocation().getPath() + "../chartthemes/";

	public static JRCsvDataSource createCategoryDatasource() throws JRException, UnsupportedEncodingException{
		JRCsvDataSource cds = new JRCsvDataSource(JRLoader.getLocationInputStream(DATAFILES_PATH_PREFIX + "data/categoryDatasource.csv"), "UTF-8");
		cds.setRecordDelimiter("\r\n");
		cds.setUseFirstRowAsHeader(true);
		return cds;
	}

	public static JRCsvDataSource createPieDatasource() throws JRException, UnsupportedEncodingException{
		JRCsvDataSource pds = new JRCsvDataSource(JRLoader.getLocationInputStream(DATAFILES_PATH_PREFIX + "data/pieDatasource.csv"), "UTF-8");
		pds.setRecordDelimiter("\r\n");
		pds.setUseFirstRowAsHeader(true);
		return pds;
	}
	
	public static JRCsvDataSource createTimePeriodDatasource() throws JRException, UnsupportedEncodingException{
		JRCsvDataSource tpds = new JRCsvDataSource(JRLoader.getLocationInputStream(DATAFILES_PATH_PREFIX + "data/timePeriodDatasource.csv"), "UTF-8");
		tpds.setRecordDelimiter("\r\n");
		tpds.setUseFirstRowAsHeader(true);
		return tpds;
	}
	
	public static JRCsvDataSource createTimeSeriesDatasource() throws JRException, UnsupportedEncodingException{
		JRCsvDataSource tsds = new JRCsvDataSource(JRLoader.getLocationInputStream(DATAFILES_PATH_PREFIX + "data/timeSeriesDatasource.csv"), "UTF-8");
		tsds.setRecordDelimiter("\r\n");
		tsds.setUseFirstRowAsHeader(true);
		tsds.setDateFormat(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"));
		return tsds;
	}
	
	public static JRCsvDataSource createXYDatasource() throws JRException, UnsupportedEncodingException{
		JRCsvDataSource xyds = new JRCsvDataSource(JRLoader.getLocationInputStream(DATAFILES_PATH_PREFIX + "data/xyDatasource.csv"), "UTF-8");
		xyds.setRecordDelimiter("\r\n");
		xyds.setUseFirstRowAsHeader(true);
		return xyds;
	}
}
