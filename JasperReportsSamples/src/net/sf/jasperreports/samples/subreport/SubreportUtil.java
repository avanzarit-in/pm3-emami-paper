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
package net.sf.jasperreports.samples.subreport;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.samples.chartthemes.ChartThemesUtil;

/**
 * @author Massimo Rabbi (mrabbi@users.sourceforge.net)
 */
public class SubreportUtil {
	
	private static String SUBREPORT_PATH_PREFIX = ChartThemesUtil.class.getProtectionDomain().getCodeSource().getLocation().getPath() + "../subreport/";
	
	public static JasperReport getProductsSubreport() {
		try {
			return (JasperReport)JRLoader.loadObjectFromFile(SUBREPORT_PATH_PREFIX+"ProductReport.jasper");
		} catch (JRException e) {
			e.printStackTrace();
			return null;
		}
	}

}
