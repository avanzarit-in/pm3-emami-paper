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
package net.sf.jasperreports.samples.xlsxdatasource;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRXlsxDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

/**
 * 
 * @author Massimo Rabbi (mrabbi@users.sourceforge.net)
 *
 */
public class XlsxDataSourceUtil {

	private static String XLSX_PATH_PREFIX = XlsxDataSourceUtil.class.getProtectionDomain().getCodeSource()
			.getLocation().getPath() + "../xlsxdatasource/";

	public static JRDataSource getXlsxDataSource() {
		JRXlsxDataSource ds = null;

		try {
			String[] columnNames = new String[] { "city", "id", "name", "address", "state", "date" };
			int[] columnIndexes = new int[] { 0, 2, 3, 4, 5, 6 };
			ds = new JRXlsxDataSource(JRLoader.getLocationInputStream(XLSX_PATH_PREFIX+"data/MultisheetXlsxDataSource.data.xlsx"));
			ds.setColumnNames(columnNames, columnIndexes);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ds;
	}

}
