import { supabase } from "../utils/supabase.js"

export async function getVendedores() {
    const { data, error } = await supabase
        .from('vendedor')
        .select('*');
    if (error) console.error('Error al obtener vendedores:', error);
    return data || [];
}

export async function getVentasPorFecha(fechaInicio, fechaFin) {
    const { data, error } = await supabase
        .from('venta')
        .select('*')
        .gte('fecha_venta', fechaInicio)
        .lte('fecha_venta', fechaFin);
    if (error) console.error('Error al obtener ventas:', error);
    return data || [];
}

export async function getReglas() {
    const { data, error } = await supabase
        .from('regla')
        .select('*')
        .order('monto_minimo', { ascending: false });
    if (error) console.error('Error al obtener reglas:', error);
    return data || [];
}