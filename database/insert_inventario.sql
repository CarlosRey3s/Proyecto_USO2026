-- ==========================================================
-- INSERTS PARA LA TABLA ITEMS_INVENTARIO
-- ==========================================================

USE sistema_laboratorio;

-- Asumimos que los laboratorios con IDs 1, 2 y 3 existen (según insert_laboratorios.sql)

INSERT INTO ITEMS_INVENTARIO (FK_laboratorio_id, nombre, codigo_interno, numero_cas, categoria, ubicacion_fisica, unidad_medida, tipo_control, cantidad_stock, stock_minimo) VALUES 
(1, 'Osciloscopio Digital', 'ELEC-001', NULL, 'Equipo', 'Estante A1', 'Unidad', 'entero', 5.00, 1.00),
(1, 'Multímetro Fluke', 'ELEC-002', NULL, 'Equipo', 'Estante A2', 'Unidad', 'entero', 12.00, 2.00),
(2, 'Resistencia 1k Ohm', 'COMP-001', NULL, 'Componente', 'Gaveta B3', 'Unidad', 'entero', 500.00, 50.00),
(2, 'Capacitor 10uF', 'COMP-002', NULL, 'Componente', 'Gaveta B4', 'Unidad', 'entero', 200.00, 20.00),
(3, 'Ácido Sulfúrico', 'QUIM-001', '7664-93-9', 'Reactivo', 'Armario de Seguridad', 'Litro', 'decimal', 10.50, 2.00),
(3, 'Alcohol Isopropílico', 'QUIM-002', '67-63-0', 'Reactivo', 'Estante C1', 'Litro', 'decimal', 25.00, 5.00),
(1, 'Protoboard Grande', 'ELEC-003', NULL, 'Material', 'Gaveta A5', 'Unidad', 'entero', 30.00, 5.00),
(2, 'Cautín 40W', 'HERR-001', NULL, 'Herramienta', 'Estante B5', 'Unidad', 'entero', 15.00, 3.00);

-- Verificación
-- SELECT * FROM ITEMS_INVENTARIO;
